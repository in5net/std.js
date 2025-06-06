import { reverseCurry } from "../fn";

/**
 * Calls a function on each value of an iterable without modifying
 * @param iter
 * @param fn a function to call on each value
 */
export const tap: {
  <T>(iter: Iterable<T>, fn: (value: T) => unknown): Generator<T>;
  <T>(fn: (value: T) => unknown): (iter: Iterable<T>) => Generator<T>;
} = reverseCurry(function* tap<T>(
  iter: Iterable<T>,
  fn: (value: T) => unknown,
) {
  for (const value of iter) {
    fn(value);
    yield value;
  }
});
