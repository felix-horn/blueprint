import { describe, expect, test } from '@jest/globals';

// @todo: import react testing lib

const sum = (a: number, b: number): number => a + b;

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
