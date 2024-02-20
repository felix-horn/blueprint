import react, {
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react';

import { ComponentCommonProps } from '../../types/commonProps';
import { Prettify } from '../../types/utils.js';
import {
  StyledCheckmark,
  StyledCheckmarkClickArea,
  StyledCheckmarkProps,
} from './Card.styles.js';

export type CardCheckmarkProps = Prettify<
  HTMLAttributes<HTMLElement> &
    ComponentCommonProps &
    StyledCheckmarkProps & {
      onSelect?: () => void;
    }
>;

export const CardCheckmark = forwardRef<HTMLElement, CardCheckmarkProps>(
  (
    {
      'data-testid': testId,
      onSelect,
      isSelected = false,
      isLoading = false,
      isSelectionDisabled = false,
      ...restProps
    },
    ref,
  ) => {
    let visualComponent: ReactNode | null = null;
    if (isLoading) {
      visualComponent = (
        <Loader size="small" data-testid={`${testId}-loader`} />
      );
    } else if (isSelected) {
      visualComponent = (
        <Icon name="select" size="small" data-testid={`${testId}-icon`} />
      );
    }

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
