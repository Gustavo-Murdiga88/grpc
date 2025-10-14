import { GetAllStoresUseCase } from "../../../domain/store/application/use-case/get-stores-usecase";
import { redisClient } from "../../cache/redis/client";
import { RedisStoresRepository } from "../../cache/redis/repositories/redis-stores-repository";
import { client as prismaClient } from "../../db/prisma/client";
import { PrismaStoresRepository } from "../../db/prisma/repositories/prisma-stores-repository";
import { GRPCGetAllStores } from "../../grpc/containers/get-all-stores";

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

	const container = new GRPCGetAllStores(useCase);
	return container.run.bind(container);
};
