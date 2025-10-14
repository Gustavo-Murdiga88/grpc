import type { StoresResponse } from "../../../../proto-gen/stores/StoresResponse";
import type { Stores } from "../../../domain/cache/repositories/stores-repository";

export class GrpcStorePresenter {
	static toProto(stores: Stores[]): StoresResponse {
		return {
			stores: stores.map((store) => {
				return {
					id: store.id.toString(),
					age: store,
					name: store.name,
					addressId: store?.addressId ?? "",
				};
			}),
		};
	}
}
