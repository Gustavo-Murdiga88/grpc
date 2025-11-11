import { RedisCustomerRepository } from "../../cache/redis/repositories/redis-customer-repository";
import { RedisStoresRepository } from "../../cache/redis/repositories/redis-stores-repository";
import client from "../../client";

export default {
	customer: new RedisCustomerRepository({
		client: client.redisClient,
	}),
	store: new RedisStoresRepository({
		client: client.redisClient,
	}),
};
