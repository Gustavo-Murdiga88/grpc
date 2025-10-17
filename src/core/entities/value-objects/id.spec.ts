import { randomUUID } from "node:crypto";
import { UniqueEntityId } from "./id";

describe("ID value object", () => {
	it("must be able to create an default id", () => {
		const id = new UniqueEntityId();
		expect(id).toBeDefined();
		expect(id.toString()).toString();
	});

	it("must be able to create with an id passes by parameter", () => {
		const idDefault = randomUUID();
		const id = new UniqueEntityId(idDefault);
		expect(id).toBeDefined();
		expect(id.toString()).toBe(idDefault);
	});

	it("must be able to verify if the ids are equals", () => {
		const idDefault = randomUUID();
		const id1 = new UniqueEntityId(idDefault);
		const id2 = new UniqueEntityId(idDefault);

		const areEquals = id1.equals(id2);

		expect(areEquals).toBe(true);
		expect(id1.toString()).toBe(id2.toString());
	});
});
