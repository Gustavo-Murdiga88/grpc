import type { PrismaClient } from "@prisma/client";
import { StoreOut } from "@/domain/store/adapters/out/store";
import type {
	IStoreRepository,
	Stores,
} from "../../../domain/store/repositories/store-repository";

export class PrismaStoresRepository implements IStoreRepository {
	private client: PrismaClient;

	constructor({ client }: { client: PrismaClient }) {
		this.client = client;
	}
	async create(store: Omit<Stores, "id">): Promise<Stores> {
		const storeCreated = await this.client.store.create({
			data: {
				name: store.name,
				addressId: store.addressId,
			},
		});

		return storeCreated;
	}

	async findAll(): Promise<Array<Stores>> {
		const stores = await this.client.store.findMany({
			select: StoreOut,
			orderBy: {
				name: "asc",
			},
		});

		return stores;
	}
}
