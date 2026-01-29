import { GRPCStoreHandler } from "@/infra/grpc/handlers/store-handler";
import * as adapters from "../ioc";

export default {
	storeHandler: new GRPCStoreHandler(
		adapters.useCase.listCustomers,
		adapters.useCase.createStore,
		adapters.useCase.listStores,
		adapters.useCase.createCustomer,
	),
};
