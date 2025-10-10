import type { PrismaClient } from "@prisma/client";
import type {
	Customer,
	ICustomerRepository,
} from "../../../../domain/customer/application/repositories/customer-repository";
import { CustomerDto } from "../../dto/customers-dto";

export class PrismaCustomerRepository implements ICustomerRepository {
	private client: PrismaClient;

	constructor({ client }: { client: PrismaClient }) {
		this.client = client;
	}

	async findAll(): Promise<Array<Customer>> {
		const customers = await this.client.user.findMany({
			select: CustomerDto,
		});

		return customers;
	}
}
