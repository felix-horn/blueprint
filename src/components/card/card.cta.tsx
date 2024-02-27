import { forwardRef, PropsWithChildren } from 'react';

import { StyledCtaButton } from './card.styles.js';

export type CardCtaProps = {
  onClick: () => void;
};

export const CardCta = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<CardCtaProps>
>(({ children, onClick }, ref) => (
  <StyledCtaButton ref={ref} onClick={onClick}>
    {children}
  </StyledCtaButton>
));
