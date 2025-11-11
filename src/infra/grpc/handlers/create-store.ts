/** biome-ignore-all lint/style/useNamingConvention: <explanation> */

import {
	type ServerUnaryCall,
	type sendUnaryData,
	status,
} from "@grpc/grpc-js";
import type { CreateStoreUseCase } from "@/domain/store/application/use-case/create-store-usecase";
import type { CreateStoreRequest__Output } from "../../../../proto-gen/stores/CreateStoreRequest";
import type { Void } from "../../../../proto-gen/stores/Void";

export class GRPCCreateStore {
	private useCase: CreateStoreUseCase;

	constructor(useCase: CreateStoreUseCase) {
		this.useCase = useCase;
	}

	public async run(
		_call: ServerUnaryCall<CreateStoreRequest__Output, Void>,
		callback: sendUnaryData<Void>,
	) {
		const body = _call.request;

		const result = await this.useCase.execute({
			name: body.name || "",
			addressId: body?.addressId || null,
		});

		if (result.isLeft()) {
			const err = result.value;
			return callback(
				{
					message: err.message,
					name: err.name,
					stack: err.stack,
					code: status.CANCELLED,
					details: err.message,
					cause: err.cause,
				},
				null,
			);
		}

		callback(null, {});
	}
}
