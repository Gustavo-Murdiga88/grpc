/** biome-ignore-all lint/style/useNamingConvention: <explanation> */

import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import type { CreateStoreUseCase } from "@/domain/store/application/use-case/create-store-usecase";
import type { CreateStoreRequest__Output } from "../../../../proto-gen/stores/CreateStoreRequest";
import type { Void } from "../../../../proto-gen/stores/Void";

export class GRPCCreateStore {
	private useCase: CreateStoreUseCase;

	constructor(useCase: CreateStoreUseCase) {
		this.useCase = useCase;
	}

	protected async handle({
		name,
		addressId,
	}: {
		name: string;
		addressId: string | undefined;
	}) {
		const result = await this.useCase.execute({
			name,
			addressId: addressId ?? null,
		});

		if (result.isLeft()) {
			throw result.value;
		}
	}

	public async run(
		_call: ServerUnaryCall<CreateStoreRequest__Output, Void>,
		callback: sendUnaryData<Void>,
	) {
		const body = _call.request;

		await this.handle({
			name: body.name || "",
			addressId: body?.addressId,
		})
			.catch((err) => {
				console.log(err);
				callback(
					{
						message: err.message,
						name: err.name,
						stack: err.stack,
						code: err.code,
						details: err.details,
						cause: err.cause,
					},
					null,
				);
			})
			.then((res) => res);

		callback(null, {});
	}
}
