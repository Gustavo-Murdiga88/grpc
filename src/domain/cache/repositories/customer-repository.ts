export type Customer = {
	id: string;
	name: string;
	age: number;
	addressId: string | null;
};

export interface ICacheCustomerRepository {
	findAll(): Promise<Array<Customer>>;
	setAll(customers: Array<Customer>): Promise<void>;
}
