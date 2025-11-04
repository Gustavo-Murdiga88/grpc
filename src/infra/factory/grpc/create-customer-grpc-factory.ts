import { CreateCustomersUseCase } from "@/domain/customer/application/use-case/create-customer-usecase";

import { client as prismaClient } from "../../db/prisma/client";
import { PrismaCustomerRepository } from "../../db/prisma/repositories/prisma-customer-repository";
import { GRPCCreateCustomer } from "@/infra/grpc/handlers/create-customer";

export const grpcCreateCustomerFactory = () => {
	const customerRepository = new PrismaCustomerRepository({
		client: prismaClient,
	});
	const useCase = new CreateCustomersUseCase({
		customerRepository,
	});

	return new GRPCCreateCustomer(useCase);
};
