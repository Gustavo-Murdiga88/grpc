/** biome-ignore-all lint/style/useNamingConvention: <explanation> */

import {
	type ServerUnaryCall,
	type sendUnaryData,
	status,
} from "@grpc/grpc-js";
import type { GetManyCustomersUseCase } from "@/domain/customer/application/use-case/get-customers-usecase";
import type { CustomersResponse } from "../../../../proto-gen/stores/CustomersResponse";
import type { Stores__Output } from "../../../../proto-gen/stores/Stores";
import { GrpcCustomerPresenter } from "../presenters/customer-presenter";

export class GRPCGetAllCustomers {
	private useCase: GetManyCustomersUseCase;

	constructor(useCase: GetManyCustomersUseCase) {
		this.useCase = useCase;
	}

	public async run(
		_call: ServerUnaryCall<Stores__Output, CustomersResponse>,
		callback: sendUnaryData<CustomersResponse>,
	) {
		const result = await this.useCase.execute();

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

		const customers = GrpcCustomerPresenter.toProto(result.value);

		if (!customers) {
			callback(null, {
				customers: [],
			});
			return;
		}

		callback(null, customers);
	}
}
