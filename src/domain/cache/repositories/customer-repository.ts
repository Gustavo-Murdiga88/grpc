import type { Customer } from "@/domain/customer/customers";

export interface ICacheCustomerRepository {
	findAll(): Promise<Array<Customer>>;
	setAll(customers: Array<Customer>): Promise<void>;
}
