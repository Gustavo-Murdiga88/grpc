import { type ServerUnaryCall, type sendUnaryData, Client } from "@grpc/grpc-js"
import type { CreateCustomerRequest__Output } from "../../../../proto-gen/stores/CreateCustomerRequest"
import type { CreateStoreRequest__Output } from "../../../../proto-gen/stores/CreateStoreRequest"
import type { CustomersResponse } from "../../../../proto-gen/stores/CustomersResponse"
import type { StoresResponse } from "../../../../proto-gen/stores/StoresResponse"
import type { StoresServiceHandlers } from "../../../../proto-gen/stores/StoresService"
import type { Void, Void__Output } from "../../../../proto-gen/stores/Void"
import { GRPCCreateCustomer } from "./create-customer"
import type { GRPCCreateStore } from "./create-store"
import type { GRPCGetAllCustomers } from "./get-all-customer"
import type { GRPCGetAllStores } from "./get-all-stores"

// @ts-ignore
export class GRPCStoreHandler implements StoresServiceHandlers {
	constructor(
		private readonly customerFindable: GRPCGetAllCustomers,
		private readonly storeCreator: GRPCCreateStore,
		private readonly storeFindable: GRPCGetAllStores,
		private readonly customerCreator: GRPCCreateCustomer,
	) {}
	
	public async createCustomer(call: ServerUnaryCall<CreateCustomerRequest__Output, Void>, response: sendUnaryData<Void>) {
		return this.customerCreator.run(call, response);
	}

	public async createStore (call: ServerUnaryCall<CreateStoreRequest__Output, Void>, response: sendUnaryData<Void>) {
		return this.storeCreator.run(call, response);
	}
	
	public async listCustomers (call: ServerUnaryCall<Void__Output, CustomersResponse>, response: sendUnaryData<CustomersResponse>) {
		return this.customerFindable.run(call, response);
	}

	public async listStores (call: ServerUnaryCall<Void__Output, StoresResponse>, response: sendUnaryData<StoresResponse>) {
		return this.storeFindable.run(call, response);
	}
}