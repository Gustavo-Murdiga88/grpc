import type { GreeterHandlers } from "../../../../proto-gen/hello/Greeter";
import { grpcGetAllCustomerFactory } from "../../factory/grpc/get-all-customer-grpc-factory";

export const containers = {
	sayHello: grpcGetAllCustomerFactory().run,
} satisfies GreeterHandlers;
