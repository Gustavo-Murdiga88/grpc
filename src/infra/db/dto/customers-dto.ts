import type { Prisma } from "@prisma/client";

export const CustomerDto: Prisma.UserSelect = {
	id: true,
	name: true,
	age: true,
	addressId: true,
};
