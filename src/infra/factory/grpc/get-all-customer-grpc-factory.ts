import { GetManyCustomersUseCase } from "../../../domain/customer/application/use-case/get-customers-usecase";
import { redisClient } from "../../cache/redis/client";
import { RedisCustomerRepository } from "../../cache/redis/repositories/redis-customer-repository";
import { client as prismaClient } from "../../db/prisma/client";
import { PrismaCustomerRepository } from "../../db/prisma/repositories/prisma-customer-repository";
import { GRPCGetAllCustomers } from "../../grpc/containers/get-all-customer";

export function grpcGetAllCustomerFactory() {
	const cache = new RedisCustomerRepository({
		client: redisClient,
	});
	const customerRepository = new PrismaCustomerRepository({
		client: prismaClient,
	});
	const useCase = new GetManyCustomersUseCase({
		cache,
		customerRepository,
	});

	return new GRPCGetAllCustomers(useCase);
}
