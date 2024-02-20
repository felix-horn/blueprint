import { forwardRef, PropsWithChildren } from 'react';

import { StyledCardHeadline } from './Card.styles.js';

type CardHeadlineProps = PropsWithChildren<
  Partial<TextProps> & { isCapitalized?: boolean }
>;

export const CardHeadline = forwardRef<HTMLElement, CardHeadlineProps>(
  ({ children, ...restProps }, ref) => (
    <StyledCardHeadline
      ref={ref}
      variant="copy1"
      weight="bold"
      forwardedAs="h4"
      {...restProps}
    >
      {children}
    </StyledCardHeadline>
  ),
);
