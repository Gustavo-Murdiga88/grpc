import { CustomerTestRepository } from "@/test/domain/customer/customer-repository";
import { Customer } from "../customers";
import type { CustomerProps } from "../repositories/customer-repository";
import { CreateCustomersUseCase } from "./create-customer-usecase";

describe("[CreateCustomerUseCase] stub", async () => {
	const repository = new CustomerTestRepository();
	const sut = new CreateCustomersUseCase({
		customerRepository: repository,
	});

	it("Should be able to create a customer ", async () => {
		const input = {
			name: "John Doe",
			addressId: "address-123",
			age: 30,
		} satisfies CustomerProps;

		const spy = vitest.spyOn(repository, "create");

		const response = await sut.execute(input);

		expect(response.isRight()).toBe(true);
		expect(response.value).to.instanceOf(Customer);
		expect(spy).toHaveBeenCalled();
		expect(spy).toHaveBeenCalledWith(input);
	});
});
