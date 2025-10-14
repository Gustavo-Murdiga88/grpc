import { randomUUID } from "node:crypto";

export class UniqueEntityId {
	private value: string;

	constructor(value?: string) {
		this.value = value ?? randomUUID();
	}

	public toString() {
		return this.value.toString();
	}

	public equals(id: UniqueEntityId): boolean {
		return this.value === id.toString();
	}

	get getValue() {
		return this.value;
	}
}
