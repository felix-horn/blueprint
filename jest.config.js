/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  // enable resolution from js to tsx files in import
  moduleNameMapper: {
    '^(\\./.+)\\.m?jsx?$': '$1',
  },
  passWithNoTests: true,
  // module path to node_modules folder with presets for jest setup with TypeScript
  preset: 'ts-jest/presets/js-with-ts-esm',
};
