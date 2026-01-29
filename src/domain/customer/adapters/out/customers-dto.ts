import type { Prisma } from "@prisma/client";

export const CustomerOut: Prisma.UserSelect = {
	id: true,
	name: true,
	age: true,
	addressId: true,
};
