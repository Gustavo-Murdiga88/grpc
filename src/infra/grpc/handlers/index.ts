

import type { StoresServiceHandlers } from "../../../../proto-gen/stores/StoresService"
import type { GRPCCreateCustomer } from "./create-customer"
import type { GRPCCreateStore } from "./create-store"
import type { GRPCGetAllCustomers } from "./get-all-customer"
import type { GRPCGetAllStores } from "./get-all-stores"
export class GRPCStoreHandler {
	constructor(
		private readonly customerFindable: GRPCGetAllCustomers,
		private readonly storeCreator: GRPCCreateStore,
		private readonly storeFindable: GRPCGetAllStores,
		private readonly customerCreator: GRPCCreateCustomer,
	) {}

	public handlers(): StoresServiceHandlers {
		return {
			listCustomers: this.customerFindable.run.bind(this.customerFindable),
			listStores: this.storeFindable.run.bind(this.storeFindable),
			createCustomer: this.customerCreator.run.bind(this.customerCreator),
			createStore: this.storeCreator.run.bind(this.storeCreator),
		}
	}
}
