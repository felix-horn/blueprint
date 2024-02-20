import { SpacingVars } from '@audi/audi-ui-react-v2';

// There is no way to import this directly from audi-ui-react ...
enum Spacing {
  xxs = 'xxs',
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
  xxl = 'xxl',
  xxxl = 'xxxl',
  pageMargin = 'pageMargin',
}

export type Prettify<T> = {
  [P in keyof T]: T[P];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type SpacingValue = SpacingVars | string | number | undefined;

export const isSpacingSize = (value: SpacingValue): value is keyof SpacingVars => {
  return typeof value === 'string' && value in Spacing;
};

export type Nullable<T> = { [K in keyof T]: T[K] | null };

/** Regular Omit can't safely be used on types that contain unions */
// https://stackoverflow.com/questions/76427947/remove-property-from-a-complex-type-in-typescript
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
