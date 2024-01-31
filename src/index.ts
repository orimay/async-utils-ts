/**
 * Creates a new Promise which resolves by queueing a microtask.
 * A microtask is a short function which runs after the function or event that created it exits and only if JavaScript
 * is not currently executing anything else. Use this function when you want to asynchronously execute code
 * but want it to run as soon as possible, without a delay duration.
 *
 * @returns A Promise object that represents a microtask.
 *
 * @example
 * microtask().then(() => {
 *   console.log("This will run as soon as possible, asynchronously.");
 * });
 */
export const microtask = () => new Promise<void>(queueMicrotask);

/**
 * Creates a promise that resolves after the current event loop has been processed
 * (i.e., after all microtasks have been completed). This can be thought of as making
 * an asynchronous task that executes after the current `macrotask`.
 *
 * @returns A new Promise that resolves after the current event loop.
 *
 * @example
 *
 * macrotask().then(() => {
 *   // This function will execute after all the current microtasks
 *   console.log('This is a macrotask');
 * });
 *
 */
export const macrotask = () => new Promise<void>(r => setTimeout(r));

/**
 * Creates a new Promise that is resolved using `requestAnimationFrame`.
 *
 * This function can be used for delaying execution of code until the next frame,
 * which is useful in animation-related operations.
 *
 * @returns A new Promise that is resolved with `requestAnimationFrame`.
 *
 * @example
 *
 * async function animate() {
 *   // ...some animation logic...
 *
 *   // Wait for the next frame
 *   await animationFrame();
 *
 *   // ...more animation logic...
 * }
 */
export const animationFrame = () =>
  new Promise<void>(r => requestAnimationFrame(() => r()));

/**
 * Creates a Promise that resolves after a specified duration.
 *
 * @param ms - The amount of time (in milliseconds) to wait before the Promise resolves.
 * @returns A Promise that resolves after the specified duration.
 *
 * @example
 * //Wait for 1 second (1000 ms)
 * await timeout(1000);
 */
export const timeout = (ms: number) => new Promise(r => setTimeout(r, ms));

/**
 * Filters elements of the input array asynchronously based on the provided predicate function.
 *
 * @param arr - The input array to filter.
 * @param predicate - Asynchronous function to test each element of the array. Returns `true` to keep the element, `false` otherwise.
 * @returns A new array with the elements that pass the test implemented by the provided asynchronous function.
 *
 * @template T - The type of the elements in the input array.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * // Predicate function to check if a number is even
 * async function isEven(num) {
 *   return num % 2 === 0;
 * }
 *
 * // Usage
 * const result = await filter(arr, isEven);
 * console.log(result); // outputs: [2, 4]
 */
export async function filter<T>(
  arr: T[],
  predicate: (value: T) => Promise<boolean>,
) {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
}

/**
 * Takes an iterable iterator and checks if any of its elements satisfy the provided predicate function.
 * Function pSome<T> runs asynchronously.
 *
 * @param iter - The iterable object to be iterated.
 * @param pred - The function to apply to each item to test for a condition.
 * @returns `true` if at least one element passes the condition check, `false` otherwise.
 *
 * @template T - The type of items in the iterable object.
 *
 * @example
 * const iter = [1, 2, 3, 4, 5];
 *
 * //Predicate function to check if a number is even
 * async function isEven(num) {
 *   return num % 2 === 0;
 * }
 *
 * //Usage
 * const result = await pSome(iter, isEven);
 * console.log(result); // outputs: true
 */
export async function pSome<T>(
  iter: Iterable<T>,
  pred: (value: T) => Promise<boolean>,
) {
  for (const value of iter) {
    if (await pred(value)) {
      return true;
    }
  }
  return false;
}

/**
 * Asynchronously checks if none of the elements from the provided iterable iterator pass the provided predicate function.
 *
 * @template T - The type of items in the iterable object.
 *
 * @param iter - The iterable object to be iterated.
 * @param pred - The function to validate each item in the iterable object.
 * @returns `true` if no element passes the condition check, `false` otherwise.
 *
 * @example
 * const iter = [1, 2, 3, 4, 5];
 *
 * // Predicate function to check if a number is even
 * async function isEven(num) {
 *   return num % 2 === 0;
 * }
 *
 * //Usage
 * const result = await pNone(iter, isEven);
 * console.log(result); // outputs: false
 */
export async function pNone<T>(
  iter: Iterable<T>,
  pred: (value: T) => Promise<boolean>,
) {
  for (const value of iter) {
    if (await pred(value)) {
      return false;
    }
  }
  return true;
}

/**
 * Takes an iterable iterator and checks every element with the provided predicate function.
 * Function pEvery<T> runs asynchronously.
 *
 * @param iter - The iterable object to be iterated.
 * @param pred - The function to apply to each item to test for a condition.
 * @returns `true` if all elements pass the condition check, `false` otherwise.
 *
 * @template T - The type of items in the iterable object.
 *
 * @example
 * const iter = [1, 2, 3, 4, 5];
 *
 * //Predicate function to check if a number is even
 * async function isEven(num) {
 *   return num % 2 === 0;
 * }
 *
 * //Usage
 * const result = await pEvery(iter, isEven);
 * console.log(result); // outputs: false
 */
export async function pEvery<T>(
  iter: Iterable<T>,
  pred: (value: T) => Promise<boolean>,
) {
  for (const value of iter) {
    if (!await pred(value)) {
      return false;
    }
  }
  return true;
}

/**
 * Retrieves the first value from an asynchronous generator. After extraction, the generator is closed.
 *
 * @param gen - The async generator from which to get the first value.
 * @returns A promise that resolves with the first value from the generator or `undefined` if the generator doesn't yield any values.
 *
 * @template T - The type of items yielded by the generator.
 *
 * @example
 * async function* asyncGen() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * }
 *
 * //Usage
 * const result = await first(asyncGen());
 * console.log(result); // outputs: 1
 */
export async function first<T>(gen: AsyncGenerator<T>) {
  try {
    return (await gen.next()).value as T | undefined;
  } finally {
    gen.return(undefined);
  }
}
