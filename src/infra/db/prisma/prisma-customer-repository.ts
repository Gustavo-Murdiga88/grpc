import type { PrismaClient } from "@prisma/client";
import { CustomerOut } from "@/domain/customer/adapters/out/customers-dto";
import { Customer } from "@/domain/customer/customers";
import type {
	CustomerProps,
	ICustomerRepository,
} from "../../../domain/customer/repositories/customer-repository";

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
			select: CustomerOut,
			orderBy: {
				name: "asc",
			},
		});

		return customers.map((customer) => Customer.create(customer, customer.id));
	}
}
