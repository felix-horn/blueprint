enum Spacing {
  XXS = 'xxs',
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl',
  XXXL = 'xxxl',
  PAGEMARGIN = 'pageMargin',
}

type SpacingVars = Record<keyof typeof Spacing, string>;

export type Prettify<T> = {
  [P in keyof T]: T[P];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type SpacingValue = SpacingVars | string | number | undefined;

export const isSpacingSize = (
  value: SpacingValue,
): value is keyof SpacingVars => typeof value === 'string' && value in Spacing;

export type Nullable<T> = { [K in keyof T]: T[K] | null };
