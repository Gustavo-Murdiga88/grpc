import { type Either, right } from "../../../core/either";
import { Customer } from "../customers";
import type {
	CustomerProps,
	ICustomerRepository,
} from "../repositories/customer-repository";

type CustomerResponse = Either<Error, Customer>;

export class CreateCustomersUseCase {
	private customerRepository: ICustomerRepository;
	constructor({
		customerRepository,
	}: {
		customerRepository: ICustomerRepository;
	}) {
		this.customerRepository = customerRepository;
	}

	async execute(customer: CustomerProps): Promise<CustomerResponse> {
		const customerCreated = await this.customerRepository.create(customer);

		return right(
			Customer.create(
				{
					addressId: customerCreated.addressId,
					age: customerCreated.age,
					name: customerCreated.name,
				},
				customerCreated.id.toString(),
			),
		);
	}
}
