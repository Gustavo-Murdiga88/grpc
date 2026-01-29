import client from "../../../infra/client";
import { PrismaCustomerRepository } from "../../../infra/db/prisma/prisma-customer-repository";
import { PrismaStoresRepository } from "../../../infra/db/prisma/prisma-stores-repository";

export default {
	customer: new PrismaCustomerRepository({
		client: client.prismaClient,
	}),
	store: new PrismaStoresRepository({
		client: client.prismaClient,
	}),
};
