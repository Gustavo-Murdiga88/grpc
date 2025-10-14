export type Customer = {
	id: string;
	name: string;
	age: number;
	addressId: string | null;
};

export interface ICustomerRepository {
	findAll(): Promise<Array<Customer>>;
	create(customer: Omit<Customer, "id">): Promise<Customer>;
}
