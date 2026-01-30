import type { Customer } from "@/domain/customer/customers";

export class CustomerPresenter {
	static toHttp(customer: Customer) {
		return {
			id: customer.id.toString(),
			name: customer.name,
			age: customer.age,
			addressId: customer?.addressId ?? "",
		};
	}
}
