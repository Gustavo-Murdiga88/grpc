import { type Either, right } from "../../../../core/either";
import type { ICacheCustomerRepository } from "../../../cache/repositories/customer-repository";
import { Customer } from "../../enterprise/entities/customers";
import type { ICustomerRepository } from "../repositories/customer-repository";

type CustomerResponse = Either<Error, Array<Customer>>;

export class GetManyCustomersUseCase {
	private customerRepository: ICustomerRepository;
	private cache: ICacheCustomerRepository;
	constructor({
		customerRepository,
		cache,
	}: {
		customerRepository: ICustomerRepository;
		cache: ICacheCustomerRepository;
	}) {
		this.customerRepository = customerRepository;
		this.cache = cache;
	}

	async execute(): Promise<CustomerResponse> {
		const cachedCustomers = await this.cache.findAll();

		if (cachedCustomers.length > 0) {
			return right(
				cachedCustomers.map((customer) =>
					Customer.create(customer, customer.id),
				),
			);
		}

		const customers = await this.customerRepository.findAll();

		await this.cache.setAll(customers);

		return right(
			customers.map((customer) => Customer.create(customer, customer.id)),
		);
	}
}
