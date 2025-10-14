import { UniqueEntityId } from "./value-objects/id";

export class Entity<T> {
	private _props: T;
	private _id: UniqueEntityId;

	protected constructor(props: T, id: string | undefined = undefined) {
		this._props = props;
		this._id = new UniqueEntityId(id);
	}

	public get id() {
		return this._id;
	}

	protected get props() {
		return this._props;
	}

	protected setProps<K extends keyof T, V extends T[K]>(key: K, value: V) {
		this._props[key] = value;
		return this;
	}
}
