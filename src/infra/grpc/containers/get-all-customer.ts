/** biome-ignore-all lint/style/useNamingConvention: <explanation> */

import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import type { helloReply } from "../../../../proto-gen/hello/helloReply";
import type { helloRequest__Output } from "../../../../proto-gen/hello/helloRequest";
import type { GetManyCustomersUseCase } from "../../../domain/customer/application/use-case/get-customers-usecase";

export class GRPCGetAllCustomers {
	private useCase: GetManyCustomersUseCase;

	constructor(useCase: GetManyCustomersUseCase) {
		this.useCase = useCase;
	}

	public async handle() {
		const result = await this.useCase.execute();

		if (result.isLeft()) {
			throw result.value;
		}

		return result.value;
	}

	public async run(
		_call: ServerUnaryCall<helloRequest__Output, helloReply>,
		callback: sendUnaryData<helloReply>,
	) {
		const response = await this.handle().catch((err) => {
			callback(err.message, null);
		});

		callback(null, { message: JSON.stringify(response) });
	}
}
