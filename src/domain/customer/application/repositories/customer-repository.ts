import type { Customer } from "../../enterprise/entities/customers";

export type CustomerProps = {
	name: string;
	age: number;
	addressId: string | null;
};

export interface ICustomerRepository {
	findAll(): Promise<Array<Customer>>;
	create(customer: CustomerProps): Promise<Customer>;
}
