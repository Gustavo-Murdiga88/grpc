import { Stores as StoresProto, StoresResponse } from "@grpc/stores_pb";
import type { Stores } from "../../../domain/cache/repositories/stores-repository";

export class GrpcStorePresenter {
	static toProto(stores: Stores[]): StoresResponse {
		const response = new StoresResponse();

		const storeProtos = stores.map((store) => {
			const storeProto = new StoresProto();
			storeProto.setId(store.id.toString());
			storeProto.setName(store.name);
			storeProto.setAddressId(store?.addressId ?? "");
			return storeProto;
		});

		return response.setStoresList(storeProtos);
	}
}
