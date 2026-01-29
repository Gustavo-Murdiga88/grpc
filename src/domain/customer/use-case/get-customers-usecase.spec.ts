import { CacheCustomerTestRepository } from "@/test/cache/customers/cache-customers-repository";
import { CustomerTestRepository } from "@/test/domain/customer/customer-repository";
import type { CustomerProps } from "../repositories/customer-repository";
import { GetManyCustomersUseCase } from "./get-customers-usecase";

describe("[GetManyCustomersUseCase] stub", async () => {
	const repository = new CustomerTestRepository();
	const cache = new CacheCustomerTestRepository();
	const sut = new GetManyCustomersUseCase({
		cache,
		customerRepository: repository,
	});

	it("Should be able fetch many customers", async () => {
		const input = {
			name: "John Doe",
			addressId: "address-123",
			age: 30,
		} satisfies CustomerProps;

		await repository.create(input);
		await repository.create(input);

		const response = await sut.execute();

		expect(response.isRight()).toBe(true);
		expect(response.value).to.toHaveLength(2);
		expect(response.value).to.be.instanceOf(Array);
		expect(response.value).to.toSatisfy((value) => {
			return value[0].name === "John Doe";
		});
	});
});
