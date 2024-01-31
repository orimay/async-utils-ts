import { describe, expect, it } from 'vitest';
import { filter, first, pEvery, pNone, pSome } from '.';

describe('filter', () => {
  it('should filter an array', async () => {
    const arr = [1, 2, 3, 4, 5];

    // Predicate function to check if a number is even
    async function isEven(num: number) {
      return num % 2 === 0;
    }

    // Usage
    const result = await filter(arr, isEven);
    expect(result).toEqual([2, 4]);
  });
});

describe('pSome', () => {
  it('should return true if at least one element satisfies the predicate', async () => {
    const iter = [1, 2, 3, 4, 5];
    const result = await pSome(iter, async (num: number) => num % 2 === 0);
    expect(result).toBe(true);
  });

  it('should return false if at least one element satisfies the predicate', async () => {
    const iter = [1, 3, 5];
    const result = await pSome(iter, async (num: number) => num % 2 === 0);
    expect(result).toBe(false);
  });
});

describe('pNone', () => {
  it('should return true if at least one element satisfies the predicate', async () => {
    const iter = [1, 3, 5];
    const result = await pNone(iter, async (num: number) => num % 2 === 0);
    expect(result).toBe(true);
  });

  it('should return false if at least one element satisfies the predicate', async () => {
    const iter = [1, 2, 3, 4, 5];
    const result = await pNone(iter, async (num: number) => num % 2 === 0);
    expect(result).toBe(false);
  });
});

describe('pEvery', () => {
  it('should return true if at least one element satisfies the predicate', async () => {
    const iter = [2, 4, 6];
    const result = await pEvery(iter, async (num: number) => num % 2 === 0);
    expect(result).toBe(true);
  });

  it('should return false if at least one element satisfies the predicate', async () => {
    const iter = [1, 2, 3, 4, 5];
    const result = await pEvery(iter, async (num: number) => num % 2 === 0);
    expect(result).toBe(false);
  });
});

describe('first', () => {
  async function* gen(items: number) {
    for (let i = 1; i <= items; ++i) {
      yield i;
    }
  }

  it('should return the first element of an array', async () => {
    const result = await first(gen(5));
    expect(result).toBe(1);
  });

  it('should return undefined if the array is empty', async () => {
    const result = await first(gen(0));
    expect(result).toBe(undefined);
  });
});
