import { type Either, left, right } from "../../../../core/either";
import type { ICacheCustomerRepository } from "../../../cache/repositories/customer-repository";
import type {
	Customer,
	ICustomerRepository,
} from "../repositories/customer-repository";

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
			return right(cachedCustomers);
		}

		const customers = await this.customerRepository.findAll();

		if (customers.length <= 0) {
			return left(new Error("No customers found"));
		}

		await this.cache.setAll(customers);

		return right(customers);
	}
}
