import React, { PropsWithChildren, forwardRef } from 'react';
import { ButtonProps } from '@audi/audi-ui-react-v2';
import { StyledCtaButton } from './Card.styles';

type CardCtaProps = PropsWithChildren<Partial<ButtonProps>>;

export const CardCta = forwardRef<HTMLElement, CardCtaProps>(
  ({ children, onClick, ...restProps }, ref) => {
    return (
      <StyledCtaButton ref={ref} onClick={onClick} variant="text" size="small" {...restProps}>
        {children}
      </StyledCtaButton>
    );
  }
);
