import type {
	ServerUnaryCall,
	sendUnaryData,
	UntypedHandleCall,
} from "@grpc/grpc-js";
import type { IStoresServiceServer } from "@grpc/stores_grpc_pb";
import {
	type CreateCustomerRequest,
	type CreateStoreRequest,
	Customers as CustomersProto,
	CustomersResponse,
	Stores as StoreProto,
	StoresResponse,
	Void,
} from "@grpc/stores_pb";
import type { CreateCustomersUseCase } from "@/domain/customer/use-case/create-customer-usecase";
import type { GetManyCustomersUseCase } from "@/domain/customer/use-case/get-customers-usecase";
import type { CreateStoreUseCase } from "@/domain/store/use-case/create-store-usecase";
import type { GetAllStoresUseCase } from "@/domain/store/use-case/get-stores-usecase";

export class StoreHandler implements IStoresServiceServer {
	constructor(
		private readonly customerFindable: GetManyCustomersUseCase,
		private readonly storeCreator: CreateStoreUseCase,
		private readonly storeFindable: GetAllStoresUseCase,
		private readonly customerCreator: CreateCustomersUseCase,
	) {}

	[method: string]: UntypedHandleCall | any;

	public async createCustomer(
		request: ServerUnaryCall<CreateCustomerRequest, Void>,
		callback: sendUnaryData<Void>,
	) {
		const input = {
			addressId: request.request.getAddressId() || null,
			age: request.request.getAge(),
			name: request.request.getName(),
		};

		await this.customerCreator.execute(input);

		callback(null, new Void());
	}

	public async createStore(
		request: ServerUnaryCall<CreateStoreRequest, Void>,
		callback: sendUnaryData<Void>,
	) {
		const input = {
			name: request.request.getName(),
			addressId: request.request.getAddressId() || null,
		};

		const store = await this.storeCreator.execute(input);

		if (store.isLeft()) {
			return callback(store.value, null);
		}

		callback(null, new Void());
	}

	public async listCustomers(
		_: ServerUnaryCall<Void, CustomersResponse.AsObject>,
		callback: sendUnaryData<CustomersResponse>,
	) {
		try {
			const customers = await this.customerFindable.execute();

			if (customers.isLeft()) {
				return callback(customers.value, null);
			}

			const customersToProto = new CustomersResponse();
			customers.value.forEach((customer) => {
				const customerProto = new CustomersProto();
				customerProto.setId(customer.id.toString());
				customerProto.setName(customer.name);
				customerProto.setAge(customer.age);
				customersToProto.addCustomers(customerProto);
			});

			return callback(null, customersToProto);
		} catch (error) {
			return callback(error as Error, null);
		}
	}

	public async listStores(
		_: ServerUnaryCall<Void, StoresResponse>,
		call: sendUnaryData<StoresResponse>,
	) {
		const stores = await this.storeFindable.execute();

		if (stores.isLeft()) {
			return call(stores.value, null);
		}
		const storesToProto = new StoresResponse();

		stores.value.forEach((store) => {
			const storeProto = new StoreProto();
			storeProto.setId(store.id.toString());
			storeProto.setName(store.name);
			storeProto.setAddressId(store?.addressId ?? "");

			storesToProto.addStores(storeProto);
		});

		return call(null, storesToProto);
	}
}
