# gRPC Microservice with Clean Architecture

A production-ready TypeScript-based microservice implementing Clean Architecture principles with gRPC and HTTP interfaces, Redis caching, PostgreSQL database, and comprehensive observability stack.

## 🏗️ Architecture Overview

This project follows **Clean Architecture** (Hexagonal Architecture) with clear separation of concerns:

```
src/
├── app/                        # Application layer (interface adapters)
│   ├── grpc/                  # gRPC server implementation
│   │   ├── server.ts          # gRPC server setup
│   │   ├── handlers/          # gRPC method handlers
│   │   ├── ioc/              # Inversion of Control containers
│   │   └── mappers/          # Data mapping utilities
│   └── http/                  # HTTP server implementation
│       ├── server.ts          # Fastify HTTP server setup
│       ├── controllers/       # HTTP route controllers
│       ├── mappers/          # HTTP data mappers
│       └── transporters/     # HTTP transport layer
├── core/                      # Core utilities and shared logic
│   ├── either.ts/.spec.ts     # Functional error handling (Either monad)
│   ├── entities/              # Base entity classes and value objects
│   ├── errors/                # Custom error classes
│   └── types/                 # Shared type definitions
├── domain/                    # Business logic layer (entities and use cases)
│   ├── cache/                 # Cache domain interfaces
│   │   └── repositories/      # Cache repository contracts
│   ├── customer/              # Customer domain
│   │   ├── customers.ts       # Customer entity
│   │   ├── adapters/          # Domain adapters
│   │   ├── repositories/      # Customer repository interfaces
│   │   └── use-case/         # Customer business use cases
│   └── store/                 # Store domain
│       ├── store.ts           # Store entity
│       ├── adapters/          # Store adapters
│       ├── repositories/      # Store repository interfaces
│       └── use-case/         # Store business use cases
└── infra/                     # Infrastructure layer (external concerns)
    ├── client.ts              # External client configurations
    ├── server-grpc.ts         # gRPC server entry point
    ├── server-http.ts         # HTTP server entry point
    ├── cache/                 # Cache implementations
    │   └── redis/            # Redis client and repositories
    └── db/                    # Database implementations
        └── prisma/           # Prisma ORM integration
```

## 🎯 Design Patterns

### Clean Architecture Layers
- **Domain Layer**: Contains business entities, use cases, and repository interfaces
- **Infrastructure Layer**: Contains implementations of repositories, gRPC services, HTTP endpoints, and external dependencies
- **Core Layer**: Contains shared utilities and error handling

### Patterns Used
- **Repository Pattern**: Abstracts data access logic for both database and cache
- **Use Case Pattern**: Encapsulates business logic
- **Factory Pattern**: Creates and wires dependencies
- **Either Pattern**: Functional error handling without exceptions
- **Cache-Aside Pattern**: Performance optimization with Redis caching

## 🚀 Key Features

- **Dual Interface**: Both gRPC and HTTP REST endpoints
- **gRPC Communication**: High-performance RPC with Protocol Buffers
- **TypeScript**: Full type safety across the application
- **Clean Architecture**: Domain-driven design with clear separation of concerns
- **Functional Error Handling**: Using Either monad for explicit error handling
- **Redis Caching**: Performance optimization with intelligent caching strategies
- **PostgreSQL + Prisma**: Robust database with type-safe ORM
- **Observability Stack**: Prometheus metrics, Grafana dashboards, and Loki logging
- **Environment Validation**: Type-safe configuration with Zod
- **Testing**: Comprehensive test suite with Vitest
- **Code Quality**: Automated linting and formatting with Biome

## 🛠️ Technology Stack

### Core Technologies
- **Language**: TypeScript (ES2022, ESM modules)
- **gRPC**: @grpc/grpc-js with Protocol Buffer code generation
- **HTTP Server**: Fastify with Pino logging
- **Database**: PostgreSQL with Prisma ORM and pg adapter
- **Cache**: Redis with connection pooling
- **Package Manager**: pnpm with workspace support

### Development Tools
- **Code Quality**: Biome (ESLint + Prettier replacement)
- **Testing**: Vitest with TypeScript support
- **Build**: tsx for development, TypeScript compiler for production
- **Database**: Prisma migrations and introspection
- **Containerization**: Docker Compose for local development

### Monitoring & Observability
- **Metrics**: Prometheus with prom-client
- **Visualization**: Grafana dashboards
- **Logging**: Pino with Loki integration
- **Monitoring**: Grafana Alloy for telemetry collection

## 🐳 Infrastructure Services

The project includes a complete local development stack:

```yaml
services:
  postgres:    # PostgreSQL database (port 5432)
  redis:       # Redis cache (port 6379, password: redis)
  prometheus:  # Metrics collection (port 9090)
  grafana:     # Monitoring dashboards (port 3001)
  loki:        # Log aggregation
  alloy:       # Telemetry collection agent
```

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm 10.28.2+
- Docker and Docker Compose

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd grpc

# Install dependencies
pnpm install

# Start infrastructure services
docker-compose up -d

# Generate Protocol Buffer types
pnpm run build:proto

# Run database migrations
pnpm run migrate

# Generate Prisma client
pnpm run generate

# Seed the database (optional)
pnpm run seed
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Start gRPC server (port 50051)
pnpm run start:dev:grpc

# Start HTTP server (port 3000) 
pnpm run start:dev:http

# Or run both servers simultaneously
# Terminal 1:
pnpm run start:dev:grpc

# Terminal 2: 
pnpm run start:dev:http
```

### Available Services
- **gRPC Server**: `localhost:50051`
- **HTTP Server**: `localhost:3000`
- **Grafana Dashboard**: `http://localhost:3001`
- **Prometheus Metrics**: `http://localhost:9090`
- **PostgreSQL**: `localhost:5432` (user: grpc, password: grpc, database: grpc)
- **Redis**: `localhost:6379` (password: redis)

## � API Reference

### gRPC Services

The project implements the `StoresService` defined in [proto/stores.proto](proto/stores.proto):

```protobuf
service StoresService {
  rpc ListStores(Void) returns (StoresResponse) {}
  rpc ListCustomers(Void) returns (CustomersListResponse) {}
  rpc CreateCustomer(CreateCustomerRequest) returns (Void) {}
  rpc CreateStore(CreateStoreRequest) returns (Void) {}
}
```

**Available Methods:**
- `ListStores`: Get all stores
- `ListCustomers`: Get all customers  
- `CreateCustomer`: Create a new customer
- `CreateStore`: Create a new store

### HTTP Endpoints

RESTful API endpoints mirroring gRPC functionality:

- **GET** `/stores` - List all stores
- **GET** `/customers` - List all customers
- **POST** `/customers` - Create a new customer
- **POST** `/stores` - Create a new store

## 📋 Domain Use Cases

### Store Management
- **ListStores**: Retrieves all stores with caching
- **CreateStore**: Creates new store with validation

### Customer Management  
- **ListCustomers**: Retrieves customers with intelligent caching strategy:
  1. **Cache Check**: First checks Redis cache for existing customers
  2. **Database Fallback**: If cache miss, fetches from PostgreSQL
  3. **Cache Population**: Stores results in Redis with TTL
  4. **Error Handling**: Returns Either<Error, Customer[]> for explicit error handling
- **CreateCustomer**: Creates new customer with business validation

## 🔄 Data Flow

### gRPC Flow
```
gRPC Client → gRPC Server → Container → Use Case → Cache/Repository → Response
```

### HTTP Flow
```
HTTP Client → Fastify → Controller → Use Case → Cache/Repository → Response
```

### Cache Strategy
```
Request → Redis Check → [Hit: Return Data] or [Miss: PostgreSQL → Cache → Return Data]
```

## ## 🔧 Development Commands

### Build & Development
```bash
# Generate Protocol Buffer types from .proto files  
pnpm run build:proto

# Run database migrations
pnpm run migrate

# Generate Prisma client
pnpm run generate

# Start gRPC server in watch mode
pnpm run start:dev:grpc

# Start HTTP server in watch mode  
pnpm run start:dev:http

# Seed database with test data
pnpm run seed
```

### Code Quality
```bash
# Lint and format with Biome
pnpm run lint

# Run all tests
pnpm test

# Run tests in watch mode
pnpm run test:watch
```

### Database Operations
```bash
# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (development only)
npx prisma migrate reset

# Deploy migrations (production)
npx prisma migrate deploy
```

## 🧪 Testing

The project uses Vitest for testing with full TypeScript support:

```bash
# Run all tests once
pnpm test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage
```

Test structure:
- Unit tests: `src/**/*.spec.ts`
- Integration tests: `test/**/*.test.ts` 
- Domain tests: `test/domain/**/*.test.ts`
- Cache tests: `test/cache/**/*.test.ts`

## 📝 Environment Configuration

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgres://grpc:grpc@localhost:5432/grpc"

# Cache
REDIS_URL="redis://localhost:6379"
REDIS_PASSWORD="redis"

# Application
NODE_ENV="development"
LOG_LEVEL="info"

# gRPC
GRPC_PORT="50051"

# HTTP
HTTP_PORT="3000"
```

## 🚀 Production Deployment

### Build Process
```bash
# Build TypeScript for production
pnpm run build

# Or use the production Dockerfile
docker build -t grpc-microservice .
```

### Environment Setup
1. **Database**: Configure PostgreSQL connection string
2. **Cache**: Set up Redis instance with authentication
3. **Environment Variables**: Set production environment variables
4. **Monitoring**: Configure Prometheus scraping and Grafana dashboards
5. **Logging**: Set up log aggregation with appropriate log levels

### Deployment Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure database migrations
- [ ] Set up Redis with persistence
- [ ] Configure monitoring and alerting
- [ ] Set up log aggregation
- [ ] Configure SSL/TLS certificates
- [ ] Set up load balancing (if needed)
- [ ] Configure backup strategies

## 📊 Monitoring & Observability

### Metrics (Prometheus)
- Application metrics via prom-client
- Database connection pool metrics
- Cache hit/miss ratios
- Request latency and throughput
- Error rates and status codes

### Dashboards (Grafana)
- Application performance overview
- Database performance metrics
- Cache performance monitoring
- Infrastructure health checks

### Logging
- Structured logging with Pino
- Configurable log levels
- Request/response logging
- Error tracking and stack traces

## 🏗️ Project Structure Benefits

### Clean Architecture Advantages
- **Testability**: Each layer can be tested in isolation with dependency injection
- **Maintainability**: Clear separation of concerns and single responsibility
- **Scalability**: Easy to add new features without breaking existing code
- **Flexibility**: Swap implementations without affecting business logic

### Performance Features
- **Connection Pooling**: Efficient database connection management
- **Redis Caching**: Reduces database load and improves response times
- **gRPC Efficiency**: Binary protocol for high-performance communication
- **TypeScript**: Compile-time optimization and error prevention

### Development Experience
- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Hot Reload**: Instant feedback during development
- **Code Quality**: Automated formatting and linting
- **Testing**: Comprehensive test coverage with fast feedback

## 🤝 Contributing

### Development Workflow
1. **Architecture**: Follow Clean Architecture principles
2. **Types**: Use TypeScript for complete type safety
3. **Errors**: Implement proper error handling with Either pattern
4. **Caching**: Add appropriate caching strategies
5. **Testing**: Write tests for each layer (unit, integration, e2e)
6. **Code Quality**: Use Biome for formatting and linting

### Code Standards
- Follow the existing domain structure
- Use dependency injection for external dependencies
- Implement repository pattern for data access
- Use value objects for domain primitives
- Write descriptive commit messages

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes following project conventions
3. Add/update tests for new functionality
4. Ensure all tests pass and code quality checks pass
5. Update documentation if needed
6. Submit pull request with clear description

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gustavo Murdiga**

---

**Note**: This microservice demonstrates production-ready Clean Architecture implementation with practical examples of caching, database access, monitoring, and dual communication protocols (gRPC + HTTP) suitable for enterprise applications.