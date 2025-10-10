class Right<L, R> {
	public readonly value: R;
	constructor(currentValue: R) {
		this.value = currentValue;
	}

	isRight(): this is Right<L, R> {
		return true;
	}

	isLeft(): this is Left<L, R> {
		return false;
	}
}

class Left<L, R> {
	public readonly value: L;
	constructor(currentValue: L) {
		this.value = currentValue;
	}

	isRight(): this is Right<L, R> {
		return false;
	}

	isLeft(): this is Left<L, R> {
		return true;
	}
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const right = <L, R>(value: R) => new Right<L, R>(value);
export const left = <L, R>(value: L) => new Left<L, R>(value);
