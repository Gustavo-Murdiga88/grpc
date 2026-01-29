import { type Either, right } from "@/core/either";
import type {
	IStoreRepository,
	Stores,
} from "../repositories/store-repository";
import { Store } from "../store";

type CreateStoreResponse = Either<Error, Store>;

export class CreateStoreUseCase {
	private storeRepository: IStoreRepository;

	constructor({
		storeRepository,
	}: {
		storeRepository: IStoreRepository;
	}) {
		this.storeRepository = storeRepository;
	}

	async execute(store: Omit<Stores, "id">): Promise<CreateStoreResponse> {
		const storeCreated = await this.storeRepository.create(store);

		return right(
			Store.create(
				{ addressId: storeCreated.addressId, name: storeCreated.name },
				storeCreated.id,
			),
		);
	}
}
