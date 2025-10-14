import type { CustomersResponse } from "../../../../proto-gen/stores/CustomersResponse";
import type { Customer } from "../../../domain/customer/enterprise/entities/customers";

export class GrpcCustomerPresenter {
	static toProto(customers: Customer[]): CustomersResponse {
		return {
			customers: customers.map((customer) => {
				return {
					id: customer.id.toString(),
					age: customer.age,
					name: customer.name,
					addressId: customer?.addressId ?? "",
				};
			}),
		};
	}
}
