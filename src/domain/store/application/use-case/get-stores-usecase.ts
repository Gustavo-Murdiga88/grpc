import { type Either, right } from "../../../../core/either";
import type { ICacheStoresRepository } from "../../../cache/repositories/stores-repository";
import type {
	IStoreRepository,
	Stores,
} from "../repositories/store-repository";

type GetAllStoresResponse = Either<Error, Array<Stores>>;

export class GetAllStoresUseCase {
	private storeRepository: IStoreRepository;
	private cacheStoreRepository: ICacheStoresRepository;

	constructor({
		storeRepository,
		cacheStoreRepository,
	}: {
		storeRepository: IStoreRepository;
		cacheStoreRepository: ICacheStoresRepository;
	}) {
		this.storeRepository = storeRepository;
		this.cacheStoreRepository = cacheStoreRepository;
	}

	async execute(): Promise<GetAllStoresResponse> {
		const cache = await this.cacheStoreRepository.findAll();

		if (cache.length > 0) {
			return right(cache);
		}

		const stores = await this.storeRepository.findAll();

		await this.cacheStoreRepository.setAll(stores);

		return right(stores);
	}
}
