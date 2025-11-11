/** biome-ignore-all lint/style/useNamingConvention: <explanation> */

import {
	type ServerUnaryCall,
	type sendUnaryData,
	status,
} from "@grpc/grpc-js";
import type { CreateCustomersUseCase } from "@/domain/customer/application/use-case/create-customer-usecase";
import type {
	CreateCustomerRequest,
	CreateCustomerRequest__Output,
} from "../../../../proto-gen/stores/CreateCustomerRequest";
import type { Void } from "../../../../proto-gen/stores/Void";

export class GRPCCreateCustomer {
	private useCase: CreateCustomersUseCase;

	constructor(useCase: CreateCustomersUseCase) {
		this.useCase = useCase;
	}
	public async run(
		_call: ServerUnaryCall<CreateCustomerRequest__Output, Void>,
		callback: sendUnaryData<CreateCustomerRequest>,
	) {
		const body = _call.request;

		const result = await this.useCase.execute({
			addressId: body?.addressId || null,
			age: body.age || 0,
			name: body.name || "",
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
