/** biome-ignore-all lint/style/useNamingConvention: <explanation> */

import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import type { StoresResponse } from "../../../../proto-gen/stores/StoresResponse";
import type { Void } from "../../../../proto-gen/stores/Void";
import type { GetAllStoresUseCase } from "../../../domain/store/application/use-case/get-stores-usecase";
import { GrpcStorePresenter } from "../presenters/store-presenter";

export class GRPCGetAllStores {
	private useCase: GetAllStoresUseCase;

	constructor(useCase: GetAllStoresUseCase) {
		this.useCase = useCase;
	}

	private async handle() {
		const result = await this.useCase.execute();

		if (result.isLeft()) {
			throw result.value;
		}

		return GrpcStorePresenter.toProto(result.value);
	}

	public async run(
		_: ServerUnaryCall<Void, ResponseType>,
		callback: sendUnaryData<StoresResponse>,
	) {
		const stores = await this.handle()
			.catch((err) => {
				console.log(err);
				callback(
					{
						message: err.message,
						name: err.name,
						stack: err.stack,
					},
					null,
				);
			})
			.then((res) => res);

		if (!stores) {
			callback(null, {
				stores: [],
			});

			return;
		}

		callback(null, stores);
	}
}
