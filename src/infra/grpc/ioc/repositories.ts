import client from "../../client";
import { PrismaCustomerRepository } from "../../db/prisma/repositories/prisma-customer-repository";
import { PrismaStoresRepository } from "../../db/prisma/repositories/prisma-stores-repository";

export default {
	customer: new PrismaCustomerRepository({
		client: client.prismaClient,
	}),
	store: new PrismaStoresRepository({
		client: client.prismaClient,
	}),
};
