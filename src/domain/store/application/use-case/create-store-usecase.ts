import { type Either, right } from "../../../../core/either";
import { Store } from "../../enterprise/entities/store";
import type {
	IStoreRepository,
	Stores,
} from "../repositories/store-repository";

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
