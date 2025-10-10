import { InternalServerError } from "../../../../core/errors/internal-server-error";
import type { ICacheCustomerRepository } from "../../../../domain/cache/repositories/customer-repository";
import type { Customer } from "../../../../domain/customer/application/repositories/customer-repository";
import type { RedisClient } from "../client";

export class RedisCustomerRepository implements ICacheCustomerRepository {
	private client: RedisClient;

	constructor({
		client,
	}: {
		client: RedisClient;
	}) {
		this.client = client;
	}
	async setAll(customers: Array<Customer>): Promise<void> {
		const customersToJson = JSON.stringify(customers, null, 2);

		await this.client
			.set("customers", customersToJson, {
				expiration: {
					type: "EX",
					value: 60 * 60, // 1 hour
				},
			})
			.catch((_err) => {
				throw new InternalServerError();
			});
	}

	async findAll(): Promise<Array<Customer>> {
		const customers = await this.client.hVals("customers");

		if (!customers) {
			return [];
		}

		const formattedCustomers = customers.map(
			(customer) => JSON.parse(customer) as Customer,
		);

		return formattedCustomers;
	}
}
