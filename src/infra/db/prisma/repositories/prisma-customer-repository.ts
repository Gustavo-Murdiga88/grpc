import type { PrismaClient } from "@prisma/client";
import { Customer } from "@/domain/customer/enterprise/entities/customers";
import type {
	CustomerProps,
	ICustomerRepository,
} from "../../../../domain/customer/application/repositories/customer-repository";
import { CustomerDto } from "../../dto/customers-dto";

export class PrismaCustomerRepository implements ICustomerRepository {
	private client: PrismaClient;

	constructor({ client }: { client: PrismaClient }) {
		this.client = client;
	}
	async create(customer: CustomerProps): Promise<Customer> {
		const customerCreated = await this.client.user.create({
			data: {
				name: customer.name,
				age: customer.age,
				addressId: customer.addressId,
			},
		});

		return Customer.create(customer, customerCreated.id.toString());
	}

	async findAll(): Promise<Array<Customer>> {
		const customers = await this.client.user.findMany({
			select: CustomerDto,
			orderBy: {
				name: "asc",
			},
		});

		return customers.map((customer) => Customer.create(customer, customer.id));
	}
}
