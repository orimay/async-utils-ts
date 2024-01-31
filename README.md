# async-utils-ts

This is a collection of TypeScript utility functions for handling asynchronous
tasks.cript.

[![npm version](https://badge.fury.io/js/async-utils-ts.svg)](https://badge.fury.io/js/async-utils-ts)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

Using npm:

```bash
npm install async-utils-ts
```

Using yarn:

```bash
yarn add async-utils-ts
```

## API

### microtask

Creates a new Promise which resolves by queueing a microtask.

```ts
microtask().then(() => {
  console.log('This will run as soon as possible, asynchronously.');
});
```

### macrotask

Creates a promise that resolves after the current event loop has been processed
(i.e., after all microtasks have been completed).

```ts
macrotask().then(() => {
  console.log('This is a macrotask');
});
```

### animationFrame

Creates a new Promise that is resolved using `requestAnimationFrame`.

```ts
async function animate() {
  // Wait for the next frame
  await animationFrame();
}
```

### timeout

Creates a Promise that resolves after a specified duration.

```ts
// Wait for 1 second (1000 ms)
await timeout(1000);
```

### filter

Filters elements of the input array asynchronously based on the provided
predicate function.

```ts
const arr = [1, 2, 3, 4, 5];

// Predicate function to check if a number is even
async function isEven(num) {
  return num % 2 === 0;
}

// Usage
const result = await filter(arr, isEven);
console.log(result); // outputs: [2, 4]
```

### pSome

Checks if any of the elements from the iterable satisfy the condition of the
provided predicate function.

```ts
const iter = [1, 2, 3, 4, 5];

// Predicate function to check if a number is even
async function isEven(num) {
  return num % 2 === 0;
}

// Usage
const result = await pSome(iter, isEven);
console.log(result); // outputs: true
```

### pNone

Checks if none of the elements from the iterable pass the condition of the
provided predicate function.

```ts
const iter = [1, 2, 3, 4, 5];

// Predicate function to check if a number is even
async function isEven(num) {
  return num % 2 === 0;
}

// Usage
const result = await pNone(iter, isEven);
console.log(result); // outputs: false
```

### pEvery

Checks if all elements from the iterable satisfy the condition of the provided
predicate function.

```ts
const iter = [1, 2, 3, 4, 5];

// Predicate function to check if a number is even
async function isEven(num) {
  return num % 2 === 0;
}

// Usage
const result = await pEvery(iter, isEven);
console.log(result); // outputs: false
```

### first

Retrieves the first value from an async generator.

```ts
async function* asyncGen() {
  yield 1;
  yield 2;
  yield 3;
}

// Usage
const result = await first(asyncGen());
console.log(result); // outputs: 1
```

## License

`async-utils-ts` is licensed under the [MIT License](LICENSE). Feel free to use
and contribute!

For issues or suggestions, please
[open an issue](https://github.com/your-username/async-utils-ts/issues).

Happy async coding! 🚀

## Authors

- Dmitrii Baranov <dmitrii.a.baranov@gmail.com>
