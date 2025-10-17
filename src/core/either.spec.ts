import { left, right } from "./either";

describe("Either", () => {
	it("must be able to return a right thing", async () => {
		const rightValue = right("right");

		expect(rightValue.isRight()).toBe(true);
		expect(rightValue.isLeft()).toBe(false);
		expect(rightValue.value).toBe("right");
	});

	it("must be able to return a left thing", async () => {
		const leftValue = left("left");

		expect(leftValue.isRight()).toBe(false);
		expect(leftValue.isLeft()).toBe(true);
		expect(leftValue.value).toBe("left");
	});
});
