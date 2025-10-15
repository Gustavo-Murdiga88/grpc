import { CreateStoreUseCase } from "@/domain/store/application/use-case/create-store-usecase";
import { PrismaStoresRepository } from "@/infra/db/prisma/repositories/prisma-stores-repository";
import { GRPCCreateStore } from "@/infra/grpc/containers/create-store";
import { client as prismaClient } from "../../db/prisma/client";

export const grpcCreateStoreFactory = () => {
	const storeRepository = new PrismaStoresRepository({
		client: prismaClient,
	});
	const useCase = new CreateStoreUseCase({
		storeRepository,
	});

	const container = new GRPCCreateStore(useCase);
	return container.run.bind(container);
};
