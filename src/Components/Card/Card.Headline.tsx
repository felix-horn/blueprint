import React, { PropsWithChildren, forwardRef } from 'react';
import { TextProps } from '@audi/audi-ui-react-v2';
import { StyledCardHeadline } from './Card.styles';

type CardHeadlineProps = PropsWithChildren<Partial<TextProps> & { isCapitalized?: boolean }>;

export const CardHeadline = forwardRef<HTMLElement, CardHeadlineProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <StyledCardHeadline ref={ref} variant="copy1" weight="bold" forwardedAs="h4" {...restProps}>
        {children}
      </StyledCardHeadline>
    );
  }
);
