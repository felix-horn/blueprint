import { forwardRef, MouseEvent, ReactNode } from 'react';

import { ComponentCommonProps } from '../../types/common-props.js';
import { Prettify } from '../../types/utils.js';
import {
  StyledCheckmark,
  StyledCheckmarkClickArea,
  StyledCheckmarkProps,
} from './card.styles.js';

export type CardCheckmarkProps = Prettify<
  ComponentCommonProps<HTMLDivElement> &
    StyledCheckmarkProps & {
      onSelect?: () => void;
    }
>;

export const CardCheckmark = forwardRef<HTMLDivElement, CardCheckmarkProps>(
  (
    {
      testId,
      onSelect,
      isSelected = false,
      isLoading = false,
      isSelectionDisabled = false,
      ...restProps
    },
    ref,
  ) => {
    let visualComponent: ReactNode | null = null;
    // if (isLoading) {
    //   visualComponent = (
    //     <Loader size="small" data-testid={`${testId}-loader`} />
    //   );
    // } else if (isSelected) {
    //   visualComponent = (
    //     <Icon name="select" size="small" data-testid={`${testId}-icon`} />
    //   );
    // }

    return (
      <StyledCheckmark
        ref={ref}
        data-testid={testId}
        onClick={onSelect}
        isSelected={isSelected}
        isSelectionDisabled={isSelectionDisabled}
        isLoading={isLoading}
        tabIndex={0}
        role="radio"
        aria-checked={isSelected}
        aria-busy={isLoading}
        aria-disabled={isLoading}
        aria-label="Select"
        {...restProps}
      >
        {visualComponent}
        <StyledCheckmarkClickArea
          isLoading={isLoading}
          isSelectionDisabled={isSelectionDisabled}
          onClick={
            onSelect
              ? (e: MouseEvent<HTMLElement>) => {
                  e.stopPropagation(); // Prevent double trigger here and on StyledCheckmark
                  onSelect();
                }
              : undefined
          }
        />
      </StyledCheckmark>
    );
  },
);
