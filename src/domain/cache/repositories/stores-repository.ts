export type Stores = {
	id: string;
	name: string;
	addressId: string | null;
};

export interface ICacheStoresRepository {
	findAll(): Promise<Array<Stores>>;
	setAll(stores: Array<Stores>): Promise<void>;
}
