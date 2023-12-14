# async-utils-ts

A collection of utility functions for asynchronous operations in TypeScript.

[![npm version](https://badge.fury.io/js/async-utils-ts.svg)](https://badge.fury.io/js/async-utils-ts)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install async-utils-ts
# or
yarn add async-utils-ts
```

## Usage

### microtask

Creates a promise that is resolved in the microtask queue.

```typescript
import { microtask } from 'async-utils-ts';

microtask().then(() => {
  // Your microtask logic here
});
```

### macrotask

Creates a promise that is resolved after a macro task (using `setTimeout`).

```typescript
import { macrotask } from 'async-utils-ts';

macrotask().then(() => {
  // Your macrotask logic here
});
```

### animationFrame

Creates a promise that is resolved in the next animation frame.

```typescript
import { animationFrame } from 'async-utils-ts';

animationFrame().then(() => {
  // Your animation frame logic here
});
```

### timeout

Creates a promise that is resolved after a specified timeout in milliseconds.

```typescript
import { timeout } from 'async-utils-ts';

timeout(1000).then(() => {
  // Your timeout logic here after 1000 milliseconds
});
```

### filter

Filters an array asynchronously based on a given predicate.

```typescript
import { filter } from 'async-utils-ts';

const arr = [1, 2, 3, 4, 5];

filter(arr, async value => {
  // Your asynchronous predicate logic here
  return value > 2;
}).then(result => {
  // result will be [3, 4, 5]
});
```

### pSome

Returns a promise that resolves to `true` if at least one element in the array
satisfies the predicate.

```typescript
import { pSome } from 'async-utils-ts';

const arr = [1, 2, 3, 4, 5];

pSome(arr, async value => {
  // Your asynchronous predicate logic here
  return value > 2;
}).then(result => {
  // result will be true
});
```

### pNone

Returns a promise that resolves to `true` if none of the elements in the array
satisfy the predicate.

```typescript
import { pNone } from 'async-utils-ts';

const arr = [1, 2, 3, 4, 5];

pNone(arr, async value => {
  // Your asynchronous predicate logic here
  return value > 5;
}).then(result => {
  // result will be true
});
```

### pEvery

Returns a promise that resolves to `true` if every element in the array
satisfies the predicate.

```typescript
import { pEvery } from 'async-utils-ts';

const arr = [1, 2, 3, 4, 5];

pEvery(arr, async value => {
  // Your asynchronous predicate logic here
  return value > 0;
}).then(result => {
  // result will be true
});
```

### first

Returns a promise that resolves to the first value produced by an asynchronous
generator.

```typescript
import { first } from 'async-utils-ts';

async function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

first(myGenerator()).then(result => {
  // result will be 1
});
```

## License

`async-utils-ts` is licensed under the [MIT License](LICENSE). Feel free to use
and contribute!

For issues or suggestions, please
[open an issue](https://github.com/your-username/async-utils-ts/issues).

Happy async coding! 🚀

## Authors

- Dmitrii Baranov <dmitrii.a.baranov@gmail.com>
