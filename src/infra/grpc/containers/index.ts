import type { StoresServiceHandlers } from "../../../../proto-gen/stores/StoresService";
import { grpcCreateCustomerFactory } from "../../factory/grpc/create-customer-grpc-factory";
import { grpcCreateStoreFactory } from "../../factory/grpc/create-store-grpc-factory";
import { grpcGetAllCustomerFactory } from "../../factory/grpc/get-all-customer-grpc-factory";
import { grpcGetStoriesFactory } from "../../factory/grpc/get-all-stores-grpc-factory";

const listCustomers = grpcGetAllCustomerFactory();
const listStores = grpcGetStoriesFactory();
const createCustomer = grpcCreateCustomerFactory();
const createStore = grpcCreateStoreFactory();
export const containers = {
	listCustomers,
	listStores,
	createCustomer,
	createStore,
} satisfies StoresServiceHandlers;
