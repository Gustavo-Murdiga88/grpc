# gRPC Microservice with Clean Architecture

A TypeScript-based gRPC microservice implementing Clean Architecture principles with Redis caching, PostgreSQL database, and Fastify HTTP server.

## 🏗️ Architecture Overview

This project follows **Clean Architecture** (Hexagonal Architecture) with clear separation of concerns:

```
src/
├── core/                       # Core utilities and shared logic
│   ├── either.ts              # Functional error handling (Either monad)
│   └── errors/                # Custom error classes
│       └── internal-server-error.ts
├── domain/                    # Business logic layer
│   ├── customer/
│   │   └── application/       # Use cases and application services
│   │       ├── repositories/  # Domain repository interfaces
│   │       └── use-case/
│   │           └── get-customers-usecase.ts
│   └── cache/                 # Cache domain interfaces
│       └── repositories/
├── infra/                     # Infrastructure layer
│   ├── db/                    # Database implementations
│   │   ├── dto/              # Data transfer objects
│   │   └── prisma/           # Prisma client and repositories
│   ├── cache/                 # Cache implementations
│   │   └── redis/            # Redis client and repositories
│   ├── grpc/                 # gRPC server and containers
│   │   ├── client.ts         # gRPC client configuration
│   │   ├── server.ts         # gRPC server setup
│   │   └── containers/       # gRPC service implementations
│   ├── http/                 # HTTP server (Fastify)
│   ├── factory/              # Dependency injection factories
│   └── env/                  # Environment configuration
├── proto-gen/                 # Auto-generated gRPC TypeScript code
└── prototypes/               # Protocol buffer definitions
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
- **gRPC Communication**: Type-safe, high-performance RPC framework
- **TypeScript**: Full type safety across the application
- **Functional Error Handling**: Using Either monad for explicit error handling
- **Redis Caching**: Intelligent caching strategy for performance
- **PostgreSQL**: Robust database with Prisma ORM
- **Clean Architecture**: Maintainable and testable codebase structure
- **Environment Validation**: Type-safe environment configuration with Zod

## 🛠️ Technology Stack

- **Language**: TypeScript (ES2022, ESM modules)
- **gRPC**: @grpc/grpc-js with protocol buffer code generation
- **HTTP Server**: Fastify
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Package Manager**: pnpm
- **Code Quality**: Biome linter and formatter
- **Architecture**: Clean Architecture / Hexagonal Architecture

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start infrastructure (PostgreSQL)
docker-compose up -d

# Generate gRPC types
pnpm run generate:types

# Run database migrations
npx prisma migrate dev

# Build TypeScript
pnpm run build
```

## 🏃‍♂️ Running the Application

```bash
# Start both gRPC and HTTP servers
pnpm run start:dev
```

The application will start:
- **gRPC Server**: `localhost:50051`
- **HTTP Server**: `localhost:3000`

## 📋 Use Cases

### GetManyCustomersUseCase
Retrieves customers with intelligent caching strategy:
1. **Cache Check**: First checks Redis cache for existing customers
2. **Database Fallback**: If cache miss, fetches from PostgreSQL
3. **Cache Population**: Stores results in Redis with TTL (1 hour)
4. **Error Handling**: Returns Either<Error, Customer[]> for explicit error handling

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

## 📝 Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL="postgres://grpc:grpc@localhost:5432/grpc"
REDIS_URL="redis://localhost:6379"
```

## 🧪 Project Structure Benefits

- **Testability**: Each layer can be tested in isolation with dependency injection
- **Maintainability**: Clear separation of concerns and single responsibility
- **Scalability**: Easy to add new features without breaking existing code
- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Performance**: Redis caching reduces database load
- **Flexibility**: Both gRPC and HTTP interfaces for different client needs

## 📈 Performance Features

- **Connection Pooling**: Prisma handles database connection pooling
- **Redis Caching**: 1-hour TTL for customer data
- **gRPC Efficiency**: Binary protocol for high-performance communication
- **Singleton Pattern**: Database and cache clients reuse connections

## 🔧 Development Commands

```bash
# Generate gRPC types from proto files
pnpm run generate:types

# Build TypeScript
pnpm run build

# Start development server
pnpm run start:dev

# Database operations
npx prisma migrate dev
npx prisma studio

# Code quality
npx biome check
npx biome format --write
```

## 🚀 Production Deployment

1. **Build**: `pnpm run build`
2. **Environment**: Set production environment variables
3. **Database**: Run migrations in production
4. **Redis**: Configure Redis instance
5. **Start**: `node dist/src/infra/server.js`

## 📝 API Endpoints

### gRPC
- **Service**: `hello.Greeter`
- **Method**: `sayHello` (returns all customers as JSON)

### HTTP
- **GET** `/customers` - Retrieve all customers

## 🤝 Contributing

1. Follow Clean Architecture principles
2. Use TypeScript for type safety
3. Implement proper error handling with Either pattern
4. Add appropriate caching strategies
5. Write tests for each layer
6. Use Biome for code formatting and linting

---

**Note**: This microservice demonstrates Clean Architecture principles with practical implementations of caching, database access, and dual communication protocols (gRPC + HTTP).