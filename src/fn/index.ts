import { type Maybe } from "../types";

export * from "./curry";
export * from "./dual";
export * from "./pipe";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const identity = <T>(x: T) => x;

export const constant =
	<T>(x: T) =>
	() =>
		x;

/**
 * Allows a function to be called only once
 */
export function once<T>(fn: () => T): () => Maybe<T> {
	let called = false;
	let result: T;
	return () => {
		if (called) return;
		result = fn();
		called = true;
		return result;
	};
}

/**
 * Caches the result of a function for each given parameter
 */
export function memoize<P, R>(func: (arg: P) => R): (arg: P) => R {
	const cache = new Map<P, R>();
	return (arg: P) => {
		if (cache.has(arg)) return cache.get(arg) as R;
		const output = func(arg);
		cache.set(arg, output);
		return output;
	};
}

export function memo<T>(fn: () => T) {
	let cache: T;
	let called = false;
	return () => {
		if (called) return cache;
		cache = fn();
		called = true;
		return cache;
	};
}

export function ttlCache<T>(fn: () => T, ttl: number) {
	let cache: T;
	let called = false;
	let lastCalled = performance.now();
	return () => {
		if (called && performance.now() - lastCalled < ttl) return cache;
		cache = fn();
		called = true;
		lastCalled = performance.now();
		return cache;
	};
}
