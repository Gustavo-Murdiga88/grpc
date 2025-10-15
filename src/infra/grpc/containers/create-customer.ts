/** biome-ignore-all lint/style/useNamingConvention: <explanation> */

import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
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

	protected async handle(data: {
		name: string;
		age: number;
		addressId: string | null;
	}) {
		const result = await this.useCase.execute(data);

		if (result.isLeft()) {
			throw result.value;
		}
	}

	public async run(
		_call: ServerUnaryCall<CreateCustomerRequest__Output, Void>,
		callback: sendUnaryData<CreateCustomerRequest>,
	) {
		const body = _call.request;

		await this.handle({
			addressId: body?.addressId || null,
			age: body.age || 0,
			name: body.name || "",
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
