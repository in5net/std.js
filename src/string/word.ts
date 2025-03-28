/**
 * Capitalizes the first character in the word
 * @param word a string
 */
export function capitalize<T extends string>(word: T): Capitalize<T> {
  const first = word[0] || "";
  return (first.toUpperCase() + word.slice(1)) as Capitalize<T>;
}

export function pluralize<S extends string>(word: S, n: number): S | `${S}s`;
export function pluralize<S extends string, P extends string>(
  word: S,
  n: number,
  plural: P,
): S | P;
export function pluralize<S extends string, P extends string>(
  word: S,
  n: number,
  plural?: P,
): (S | `${S}s`) | (S | P) {
  if (n === 1) {
    return word;
  }
  if (plural) {
    return plural;
  }
  return `${word}s` as const;
}

export function quantify<S extends string>(word: S, n: number): string;
export function quantify<S extends string, P extends string>(
  word: S,
  quantity: number,
  plural: P,
): string;
export function quantify<S extends string, P extends string>(
  word: S,
  quantity: number,
  plural?: P,
) {
  return `${quantity} ${
    plural ? pluralize(word, quantity, plural) : pluralize(word, quantity)
  }` as const;
}

/**
 * Capitalizes the first character in each word
 * @exmaple
 * ```ts
 * titalize("hello world"); // "Hello World"
 * ```
 */
export function titalize(str: string): string {
  return str
    .split(" ")
    .map(word => capitalize(word))
    .join(" ");
}
