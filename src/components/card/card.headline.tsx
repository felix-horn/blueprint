import { forwardRef, PropsWithChildren } from 'react';

import { TextProps } from '../text/text.js';
import { StyledCardHeadline } from './card.styles.js';

type CardHeadlineProps = Partial<TextProps> & { isCapitalized?: boolean };

export const CardHeadline = forwardRef<
  HTMLElement,
  PropsWithChildren<CardHeadlineProps>
>(({ children, ...restProps }, ref) => (
  <StyledCardHeadline ref={ref} weight="bold" {...restProps}>
    {children}
  </StyledCardHeadline>
));
