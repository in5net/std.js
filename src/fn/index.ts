/**
 * @module
 * Common function wrappers and utilities
 */

import { type Maybe } from "../types";

export * from "./pipe";
export * from "./reverse-curry";

export const noop: () => void = () => {};

export const identity = <T>(x: T): T => x;

export const constant =
  <T>(x: T): (() => T) =>
  () =>
    x;

/**
 * Allows a function to be called only once
 */
export function once<T>(fn: () => T): () => Maybe<T> {
  let called = false;
  let result: T;
  return () => {
    if (called) {
      return;
    }
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
    if (cache.has(arg)) {
      return cache.get(arg) as R;
    }
    const output = func(arg);
    cache.set(arg, output);
    return output;
  };
}

export interface Memo<Return> {
  (): Return;
  invalidate: () => void;
}
export function memo<T>(fn: () => T): Memo<T> {
  let cache: T;
  let called = false;
  const memoized: Memo<T> = () => {
    if (called) {
      return cache;
    }
    cache = fn();
    called = true;
    return cache;
  };
  memoized.invalidate = () => (called = false);
  return memoized;
}

export function ttlCache<T>(fn: () => T, ttl: number): () => T {
  let cache: T;
  let called = false;
  let lastCalled = performance.now();
  return () => {
    if (called && performance.now() - lastCalled < ttl) {
      return cache;
    }
    cache = fn();
    called = true;
    lastCalled = performance.now();
    return cache;
  };
}
