import { Entity } from "../../../../core/entities/entity";

interface ICustomerProps {
	name: string;
	age: number;
	addressId: string | null;
}

export class Customer extends Entity<ICustomerProps> {
	protected constructor(props: ICustomerProps, id?: string) {
		super(props, id);
	}

	protected set name(name: string) {
		this.setProps("name", name);
	}
	protected set addressId(addressId: string | null) {
		this.setProps("addressId", addressId);
	}

	protected set age(age: number) {
		this.setProps("age", age);
	}

	get name() {
		return this.props.name;
	}

	get age() {
		this;
		return this.props.age;
	}

	get addressId() {
		return this.props.addressId;
	}

	static create(props: ICustomerProps, id?: string) {
		const customer = new Customer(props, id);
		return customer;
	}
}
