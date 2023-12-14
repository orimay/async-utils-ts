/**
 * Creates a promise that is resolved in the microtask queue.
 * @returns A promise that is resolved in the microtask queue.
 */
export const microtask = () => new Promise<void>(queueMicrotask);

/**
 * Creates a promise that is resolved after a macro task (using `setTimeout`).
 * @returns A promise that is resolved after a macro task.
 */
export const macrotask = () => new Promise<void>(r => setTimeout(r));

/**
 * Creates a promise that is resolved in the next animation frame.
 * @returns A promise that is resolved in the next animation frame.
 */
export const animationFrame = () =>
  new Promise<void>(r => requestAnimationFrame(() => r()));

/**
 * Creates a promise that is resolved after a specified timeout in milliseconds.
 * @param ms The timeout duration in milliseconds.
 * @returns A promise that is resolved after the specified timeout.
 */
export const timeout = (ms: number) => new Promise(r => setTimeout(r, ms));

/**
 * Filters an array asynchronously based on a given predicate.
 * @param arr The array to filter.
 * @param predicate The asynchronous predicate function.
 * @returns A promise that resolves to a new array containing only the elements that satisfy the predicate.
 */
export async function filter<T>(
  arr: T[],
  predicate: (value: T) => Promise<boolean>,
) {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
}

/**
 * Returns a promise that resolves to `true` if at least one element in the array satisfies the predicate.
 * @param arr The array to check.
 * @param pred The asynchronous predicate function.
 * @returns A promise that resolves to `true` if at least one element satisfies the predicate; otherwise, resolves to `false`.
 */
export function pSome<T>(arr: T[], pred: (value: T) => Promise<boolean>) {
  return new Promise(async resolve => {
    await Promise.all(
      arr.map(async value => {
        if (await pred(value)) resolve(true);
      }),
    );
    resolve(false);
  });
}

/**
 * Returns a promise that resolves to `true` if none of the elements in the array satisfy the predicate.
 * @param arr The array to check.
 * @param pred The asynchronous predicate function.
 * @returns A promise that resolves to `true` if none of the elements satisfy the predicate; otherwise, resolves to `false`.
 */
export function pNone<T>(arr: T[], pred: (value: T) => Promise<boolean>) {
  return new Promise(async resolve => {
    await Promise.all(
      arr.map(async value => {
        if (await pred(value)) resolve(false);
      }),
    );
    resolve(true);
  });
}

/**
 * Returns a promise that resolves to `true` if every element in the array satisfies the predicate.
 * @param arr The array to check.
 * @param pred The asynchronous predicate function.
 * @returns A promise that resolves to `true` if every element satisfies the predicate; otherwise, resolves to `false`.
 */
export function pEvery<T>(arr: T[], pred: (value: T) => Promise<boolean>) {
  return new Promise(async resolve => {
    await Promise.all(
      arr.map(async value => {
        if (!await pred(value)) resolve(false);
      }),
    );
    resolve(true);
  });
}

/**
 * Returns a promise that resolves to the first value produced by an asynchronous generator.
 * @param gen  The asynchronous generator.
 * @returns A promise that resolves to the first value produced by the generator, or undefined if the generator is exhausted.
 */
export async function first<T>(gen: AsyncGenerator<T>) {
  try {
    return (await gen.next()).value as T | undefined;
  } finally {
    gen.return(undefined);
  }
}
