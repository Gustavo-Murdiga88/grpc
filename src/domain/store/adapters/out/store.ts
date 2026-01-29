import type { Prisma } from "@prisma/client";

export const StoreOut: Prisma.StoreSelect = {
	id: true,
	name: true,
	addressId: true,
};
