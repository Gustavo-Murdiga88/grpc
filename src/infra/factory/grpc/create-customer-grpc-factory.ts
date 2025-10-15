import { CreateCustomersUseCase } from "@/domain/customer/application/use-case/create-customer-usecase";

import { GRPCCreateCustomer } from "@/infra/grpc/containers/create-customer";
import { client as prismaClient } from "../../db/prisma/client";
import { PrismaCustomerRepository } from "../../db/prisma/repositories/prisma-customer-repository";

export const grpcCreateCustomerFactory = () => {
	const customerRepository = new PrismaCustomerRepository({
		client: prismaClient,
	});
	const useCase = new CreateCustomersUseCase({
		customerRepository,
	});

	const container = new GRPCCreateCustomer(useCase);
	return container.run.bind(container);
};
