/** biome-ignore-all lint/style/useNamingConvention: <explanation> */

import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import type { CustomersResponse } from "../../../../proto-gen/stores/CustomersResponse";
import type { Stores__Output } from "../../../../proto-gen/stores/Stores";
import type { GetManyCustomersUseCase } from "../../../domain/customer/application/use-case/get-customers-usecase";
import { GrpcCustomerPresenter } from "../presenters/customer-presenter";

export class GRPCGetAllCustomers {
	private useCase: GetManyCustomersUseCase;

	constructor(useCase: GetManyCustomersUseCase) {
		this.useCase = useCase;
	}

	protected async handle() {
		const result = await this.useCase.execute();

		if (result.isLeft()) {
			throw result.value;
		}

		return GrpcCustomerPresenter.toProto(result.value);
	}

	public async run(
		_call: ServerUnaryCall<Stores__Output, CustomersResponse>,
		callback: sendUnaryData<CustomersResponse>,
	) {
		const customers = await this.handle()
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

		if (!customers) {
			callback(null, {
				customers: [],
			});
			return;
		}

		callback(null, customers);
	}
}
