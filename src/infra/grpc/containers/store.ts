import { grpcCreateCustomerFactory } from "../../factory/grpc/create-customer-grpc-factory";
import { grpcCreateStoreFactory } from "../../factory/grpc/create-store-grpc-factory";
import { grpcGetAllCustomerFactory } from "../../factory/grpc/get-all-customer-grpc-factory";
import { grpcGetStoriesFactory } from "../../factory/grpc/get-all-stores-grpc-factory";
import { GRPCStoreHandler } from "../handlers";

export default new GRPCStoreHandler(
	grpcGetAllCustomerFactory(),
	grpcCreateStoreFactory(),
	grpcGetStoriesFactory(),
	grpcCreateCustomerFactory(),
).handlers();
