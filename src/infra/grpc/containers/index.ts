import type { StoresServiceHandlers } from "../../../../proto-gen/stores/StoresService";
import { grpcGetAllCustomerFactory } from "../../factory/grpc/get-all-customer-grpc-factory";
import { grpcGetStoriesFactory } from "../../factory/grpc/get-all-stores-grpc-factory";

const listCustomers = grpcGetAllCustomerFactory();
const listStores = grpcGetStoriesFactory();
export const containers = {
	listCustomers,
	listStores,
} satisfies StoresServiceHandlers;
