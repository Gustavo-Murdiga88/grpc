import { CreateStoreUseCase } from "@/domain/store/application/use-case/create-store-usecase";
import { PrismaStoresRepository } from "@/infra/db/prisma/repositories/prisma-stores-repository";
import { client as prismaClient } from "../../db/prisma/client";
import { GRPCCreateStore } from "@/infra/grpc/handlers/create-store";

export const grpcCreateStoreFactory = () => {
	const storeRepository = new PrismaStoresRepository({
		client: prismaClient,
	});
	const useCase = new CreateStoreUseCase({
		storeRepository,
	});

	return new GRPCCreateStore(useCase);
};
