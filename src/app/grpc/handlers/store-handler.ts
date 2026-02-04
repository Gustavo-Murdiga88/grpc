import type {
	ServerUnaryCall,
	sendUnaryData,
	UntypedHandleCall,
} from "@grpc/grpc-js";
import type { CreateCustomersUseCase } from "@/domain/customer/use-case/create-customer-usecase";
import type { GetManyCustomersUseCase } from "@/domain/customer/use-case/get-customers-usecase";
import type { CreateStoreUseCase } from "@/domain/store/use-case/create-store-usecase";
import type { GetAllStoresUseCase } from "@/domain/store/use-case/get-stores-usecase";
import type * as grpc from "@/grpc/stores_grpc_pb";
import * as Store from "@/grpc/stores_pb";

export default class StoreHandler implements grpc.IStoresServiceServer {
	constructor(
		private readonly customerFindable: GetManyCustomersUseCase,
		private readonly storeCreator: CreateStoreUseCase,
		private readonly storeFindable: GetAllStoresUseCase,
		private readonly customerCreator: CreateCustomersUseCase,
	) {}

	[method: string]: UntypedHandleCall | any;

	public async createCustomer(
		request: ServerUnaryCall<Store.CreateCustomerRequest, Store.Void>,
		callback: sendUnaryData<Store.Void>,
	) {
		const input = {
			addressId: request.request.getAddressId() || null,
			age: request.request.getAge(),
			name: request.request.getName(),
		};

		await this.customerCreator.execute(input);

		callback(null, new Store.Void());
	}

	public async createStore(
		request: ServerUnaryCall<Store.CreateStoreRequest, Store.Void>,
		callback: sendUnaryData<Store.Void>,
	) {
		const input = {
			name: request.request.getName(),
			addressId: request.request.getAddressId() || null,
		};

		const store = await this.storeCreator.execute(input);

		if (store.isLeft()) {
			return callback(store.value, null);
		}

		callback(null, new Store.Void());
	}

	public async listCustomers(
		_: ServerUnaryCall<Store.Void, Store.CustomersListResponse>,
		callback: sendUnaryData<Store.CustomersListResponse>,
	) {
		try {
			const customers = await this.customerFindable.execute();

			if (customers.isLeft()) {
				return callback(customers.value, null);
			}

			const customersToProto = new Store.CustomersListResponse();
			customers.value.forEach((customer) => {
				const customerProto = new Store.Customer();

				customerProto
					.setId(customer.id.toString())
					.setAddressId(customer?.addressId ?? "")
					.setAge(customer.age)
					.setName(customer.name);

				customersToProto.addCustomers(customerProto);
			});

			return callback(null, customersToProto);
		} catch (error) {
			return callback(error as Error, null);
		}
	}

	public async listStores(
		_: ServerUnaryCall<Store.Void, Store.StoresResponse>,
		call: sendUnaryData<Store.StoresResponse>,
	) {
		const stores = await this.storeFindable.execute();

		if (stores.isLeft()) {
			return call(stores.value, null);
		}
		const storesToProto = new Store.StoresResponse();

		stores.value.forEach((store) => {
			const storeProto = new Store.Stores();
			storeProto.setId(store.id.toString());
			storeProto.setName(store.name);
			storeProto.setAddressId(store?.addressId ?? "");

			storesToProto.addStores(storeProto);
		});

		return call(null, storesToProto);
	}
}
