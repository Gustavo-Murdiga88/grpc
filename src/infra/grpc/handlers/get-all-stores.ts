/** biome-ignore-all lint/style/useNamingConvention: <explanation> */

import {
	type ServerUnaryCall,
	type sendUnaryData,
	status,
} from "@grpc/grpc-js";
import type { GetAllStoresUseCase } from "@/domain/store/application/use-case/get-stores-usecase";
import type { StoresResponse } from "../../../../proto-gen/stores/StoresResponse";
import type { Void } from "../../../../proto-gen/stores/Void";
import { GrpcStorePresenter } from "../presenters/store-presenter";

export class GRPCGetAllStores {
	private useCase: GetAllStoresUseCase;

	constructor(useCase: GetAllStoresUseCase) {
		this.useCase = useCase;
	}
	public async run(
		_: ServerUnaryCall<Void, ResponseType>,
		callback: sendUnaryData<StoresResponse>,
	) {
		const result = await this.useCase.execute();

		if (result.isLeft()) {
			const err = result.value;
			return callback(
				{
					message: err.message,
					name: err.name,
					stack: err.stack,
					cause: err.cause,
					details: err.message,
					code: status.CANCELLED,
				},
				null,
			);
		}

		const stores = GrpcStorePresenter.toProto(result.value);

		if (!stores) {
			callback(null, {
				stores: [],
			});

			return;
		}

		callback(null, stores);
	}
}
