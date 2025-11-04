import { GRPCGetAllStores } from "@/infra/grpc/handlers/get-all-stores";
import { GetAllStoresUseCase } from "../../../domain/store/application/use-case/get-stores-usecase";
import { redisClient } from "../../cache/redis/client";
import { RedisStoresRepository } from "../../cache/redis/repositories/redis-stores-repository";
import { client as prismaClient } from "../../db/prisma/client";
import { PrismaStoresRepository } from "../../db/prisma/repositories/prisma-stores-repository";

export const grpcGetStoriesFactory = () => {
	const cache = new RedisStoresRepository({
		client: redisClient,
	});
	const storeRepository = new PrismaStoresRepository({
		client: prismaClient,
	});
	const useCase = new GetAllStoresUseCase({
		cacheStoreRepository: cache,
		storeRepository: storeRepository,
	});

	return new GRPCGetAllStores(useCase);
};
