import { RedisCustomerRepository } from "@/infra/cache/redis/redis-customer-repository";
import { RedisStoresRepository } from "@/infra/cache/redis/redis-stores-repository";
import client from "@/infra/client";

export default {
	customer: new RedisCustomerRepository({
		client: client.redisClient,
	}),
	store: new RedisStoresRepository({
		client: client.redisClient,
	}),
};
