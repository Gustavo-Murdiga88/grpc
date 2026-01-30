import { StoreHandler } from "../../handlers";
import useCase from "./use-case";

export default {
	store: new StoreHandler(
		useCase.listCustomers,
		useCase.createStore,
		useCase.listStores,
		useCase.createCustomer,
	),
};
