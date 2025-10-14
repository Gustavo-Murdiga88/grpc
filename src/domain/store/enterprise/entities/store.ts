import { Entity } from "../../../../core/entities/entity";

interface IStore {
	name: string;
	addressId: string | null;
}
export class Store extends Entity<IStore> {
	protected set name(name: string) {
		this.setProps("name", name);
	}

	protected set addressId(addressId: string | null) {
		this.setProps("addressId", addressId);
	}

	protected constructor(props: IStore, id?: string | undefined) {
		super(props, id);
	}

	get name() {
		return this.props.name;
	}

	get addressId() {
		return this.props.addressId;
	}

	static create(props: IStore, id: string | undefined = undefined) {
		return new Store(props, id);
	}
}
