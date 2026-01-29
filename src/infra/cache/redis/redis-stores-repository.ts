import { InternalServerError } from "../../../core/errors/internal-server-error";
import type {
	ICacheStoresRepository,
	Stores,
} from "../../../domain/cache/repositories/stores-repository";
import type { RedisClient } from "./client";

export class RedisStoresRepository implements ICacheStoresRepository {
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
	async setAll(customers: Array<Stores>): Promise<void> {
		const storesCacheToJson = JSON.stringify(customers, null, 2);

		await this.connect();
		await this.client.set("stores", storesCacheToJson, {
			expiration: {
				type: "EX",
				value: 5, // 5 seconds
			},
		});
		this.client.destroy();
	}

	async findAll(): Promise<Array<Stores>> {
		await this.connect();
		const stores: Array<Stores> = JSON.parse(
			(await this.client.get("stores")) || "[]",
		);
		this.client.destroy();

		if (!stores) {
			return [];
		}
		return stores;
	}
}
