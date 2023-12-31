/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable @typescript-eslint/ban-ts-comment */

export const hasOwn = <T, K extends PropertyKey>(
	obj: T,
	key: K,
): obj is T & { [key in K]: unknown } =>
	Object.prototype.hasOwnProperty.call(obj, key);

export function shallowEquals<A, B>(a: A, b: B) {
	// @ts-expect-error
	if (a === b) return true;
	for (const key in a) {
		if (hasOwn(a, key) && !hasOwn(b, key)) return false;
	}

	for (const key in b) {
		if (hasOwn(b, key) && !hasOwn(a, key)) return false;
	}

	return true;
}

export function deepEquals<A, B>(a: A, b: B) {
	// @ts-expect-error
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.constructor !== b.constructor) return false;
	for (const key in a) {
		if (hasOwn(a, key)) {
			if (!hasOwn(b, key)) return false; // @ts-expect-error
			if (a[key] === b[key]) continue;
			if (typeof a[key] !== "object") return false;
			if (!deepEquals(a[key], b[key])) return false;
		}
	}

	for (const key in b) {
		if (hasOwn(b, key)) {
			if (!hasOwn(a, key)) return false; // @ts-expect-error
			if (a[key] === b[key]) continue;
			if (typeof b[key] !== "object") return false;
			if (!deepEquals(a[key], b[key])) return false;
		}
	}

	return true;
}

export function value2Keys<K extends string, T extends string>(
	obj: Record<K, Iterable<T>>,
): Record<T, K[]> {
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	const result = {} as Record<T, K[]>;
	for (const [key, iter] of objectEntries(obj))
		for (const v of iter) {
			if (!result[v]) result[v] = [];
			result[v].push(key);
		}

	return result;
}

export const objectKeys = Object.keys as <T>(obj: T) => Array<keyof T>;
type Entry<T> = [key: keyof T, value: T[keyof T]];
type Entries<T> = Array<Entry<T>>;
export const objectEntries = Object.entries as <T>(obj: T) => Entries<T>;
type ReadonlyEntry<T> = [key: keyof T, value: T[keyof T]];
export const objectFromEntries = Object.fromEntries as <T>(
	entries: Iterable<ReadonlyEntry<T>>,
) => T;

export function objectMap<T, U>(obj: T, fn: (value: Entry<T>) => U) {
	return objectFromEntries(
		// @ts-expect-error
		objectEntries(obj).map(([key, value]) => [key, fn([key, value])]),
	) as { [K in keyof T]: U };
}

export function deepCopy<T>(object: T): T {
	if (object == null) return object;
	// @ts-expect-error Array.isArray returns any[]
	if (Array.isArray(object)) return object.map(deepCopy);
	if (typeof object !== "object") return object;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const copy = Object.create(Object.getPrototypeOf(object)) as T;
	for (const key in object) {
		if (hasOwn(object, key)) copy[key] = deepCopy(object[key]);
	}

	return copy;
}

export function pickByKeys<T, K extends keyof T>(object: T, key: K): T[K];
export function pickByKeys<T, K extends keyof T>(
	object: T,
	keys: Iterable<K>,
): Pick<T, K>;
export function pickByKeys<T, K extends keyof T>(
	object: T,
	keys: K | Iterable<K>,
) {
	if (Array.isArray(keys)) {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const result = {} as Pick<T, K>;
		for (const key of keys) {
			// @ts-expect-error
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			result[key] = object[key];
		}

		return result;
	}

	// @ts-expect-error
	return object[keys];
}
