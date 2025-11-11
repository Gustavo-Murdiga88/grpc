import * as Redis from "./cache/redis/client";
import * as Prisma from "./db/prisma/client";

export default {
	prismaClient: Prisma.client,
	redisClient: Redis.redisClient,
};
