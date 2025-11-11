import * as adapters from "../ioc";
import { GRPCCreateCustomer } from "./create-customer";
import { GRPCCreateStore } from "./create-store";
import { GRPCGetAllCustomers } from "./get-all-customer";
import { GRPCGetAllStores } from "./get-all-stores";
import { GRPCStoreHandler } from "./store-handler";

export default {
	storeHandler: new GRPCStoreHandler(
		new GRPCGetAllCustomers(adapters.useCase.listCustomers),
		new GRPCCreateStore(adapters.useCase.createStore),
		new GRPCGetAllStores(adapters.useCase.listStores),
		new GRPCCreateCustomer(adapters.useCase.createCustomer),
	),
};
