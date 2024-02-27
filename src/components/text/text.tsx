import { forwardRef, PropsWithChildren } from 'react';

import { ComponentCommonProps } from '../../types/common-props.js';
import { StyledText } from './text.styles.js';

export type FontWeight = 'normal' | 'bold';

export type TextProps = ComponentCommonProps<HTMLSpanElement> & {
  // The HTML element the component will render.
  // It can be any of the following: `"h1"`, `"h2"`, `"h3"`, `"h4"`, `"h5"`, `"h6"`, `"p"`, `"span"`, `"strong"`, `"b"`, `"em"`, `"i"`, `"q"`, `"mark"`, `"sub"`, `"sup"`, `"time"`, `"figcaption"`.
  // as?: HTMLElement;
  /** Main styling (font family and size related properties). */
  // variant?: HTMLElement;
  /** Visual weight of the font. */
  weight?: FontWeight;
  /** Optional role attribute */
};

export const Text = forwardRef<HTMLSpanElement, PropsWithChildren<TextProps>>(
  (
    {
      // variant = 'p',
      //  as = 'p',
      weight = 'normal',
      children,
      ...restProps
    },
    ref,
  ) => {
    const passThroughProps = {
      // as,
      restProps,
      // variant,
      weight,
    };

    return (
      <StyledText ref={ref} {...passThroughProps}>
        {children}
      </StyledText>
    );
  },
);
