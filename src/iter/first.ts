/**
 * Returns the first value of an iterable
 * @param iter
 */
export function first<T>(iter: Iterable<T>): T | undefined {
  const result = iter[Symbol.iterator]().next();
  if (!result.done) {
    return result.value;
  }
}
