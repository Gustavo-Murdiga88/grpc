import {
	Customers as CustomersProto,
	CustomersResponse,
} from "@grpc/stores_pb";
import type { Customer } from "@/domain/customer/customers";

export class GrpcCustomerPresenter {
	static toProto(customers: Customer[]): CustomersResponse {
		const response = new CustomersResponse();

		const list = customers.map((customer) => {
			return new CustomersProto()
				.setId(customer.id.toString())
				.setAge(customer.age)
				.setName(customer.name)
				.setAddressId(customer?.addressId ?? "");
		});

		response.setCustomersList(list);

		return response;
	}
}
