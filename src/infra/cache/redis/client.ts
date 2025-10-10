import { createClient } from "redis";
import { envs } from "../../env/envs";

export const redisClient = createClient({
	url: envs.REDIS_URL,
});

export type RedisClient = ReturnType<typeof createClient>;
