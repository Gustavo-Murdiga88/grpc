import { CreateCustomersUseCase } from "@/domain/customer/use-case/create-customer-usecase";
import { GetManyCustomersUseCase } from "@/domain/customer/use-case/get-customers-usecase";
import { CreateStoreUseCase } from "@/domain/store/use-case/create-store-usecase";
import { GetAllStoresUseCase } from "@/domain/store/use-case/get-stores-usecase";

import cache from "./cache";
import repository from "./repositories";

export default {
	createCustomer: new CreateCustomersUseCase({
		customerRepository: repository.customer,
	}),
	createStore: new CreateStoreUseCase({
		storeRepository: repository.store,
	}),
	listCustomers: new GetManyCustomersUseCase({
		cache: cache.customer,
		customerRepository: repository.customer,
	}),
	listStores: new GetAllStoresUseCase({
		cacheStoreRepository: cache.store,
		storeRepository: repository.store,
	}),
};
