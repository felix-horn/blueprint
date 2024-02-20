// const {} = import 'jest'

// const {defaults} = require('jest-config');

// Why not /** @type {import('jest').Config} */

/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  // Why?
  moduleNameMapper: {
    '^(\\./.+)\\.m?jsx?$': '$1',
  },
  // Not in documentation.
  passWithNoTests: true,
  // No such folder on root level.
  preset: 'ts-jest/presets/js-with-ts-esm',
  roots: ['src'],
  // `node` is default already.
  testEnvironment: 'node',
};
