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

	private async connect() {
		await this.client.connect();

		if (this.client.isReady === false) {
			throw new InternalServerError();
		}
	}

	async setAll(customers: Array<Customer>): Promise<void> {
		const customersToJson = JSON.stringify(customers, null, 2);
		await this.connect();

		await this.client
			.set("customers", customersToJson, {
				expiration: {
					type: "EX",
					value: 5, // 5 seconds
				},
			})
			.catch((_err) => {
				throw new InternalServerError();
			});

		this.client.destroy();
	}

	async findAll(): Promise<Array<Customer>> {
		await this.connect();

		const customers: Array<Customer> = JSON.parse(
			(await this.client.get("customers")) || "[]",
		);
		this.client.destroy();

		if (customers.length === 0) {
			return [];
		}

		return customers;
	}
}
