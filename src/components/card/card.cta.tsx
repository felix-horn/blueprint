import { forwardRef, PropsWithChildren } from 'react';

import { StyledCtaButton } from './Card.styles.js';

type CardCtaProps = PropsWithChildren<Partial<ButtonProps>>;

export const CardCta = forwardRef<HTMLElement, CardCtaProps>(
  ({ children, onClick, ...restProps }, ref) => (
    <StyledCtaButton
      ref={ref}
      onClick={onClick}
      variant="text"
      size="small"
      {...restProps}
    >
      {children}
    </StyledCtaButton>
  ),
);
