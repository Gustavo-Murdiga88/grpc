export type Stores = {
	id: string;
	name: string;
	addressId: string | null;
};

export interface IStoreRepository {
	findAll(): Promise<Array<Stores>>;
	create(store: Omit<Stores, "id">): Promise<Stores>;
}
