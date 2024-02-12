import React, { HTMLAttributes, MouseEvent, ReactNode, forwardRef } from 'react';
import { Icon, Loader } from '@audi/audi-ui-react-v2';
import { ComponentCommonProps } from '../../types/commonProps';
import { Prettify } from '../../types/utils';
import { StyledCheckmarkClickArea, StyledCheckmark, StyledCheckmarkProps } from './Card.styles';

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
    ref
  ) => {
    let visualComponent: ReactNode | null = null;
    if (isLoading) {
      visualComponent = <Loader size="small" data-testid={`${testId}-loader`} />;
    } else if (isSelected) {
      visualComponent = <Icon name="select" size="small" data-testid={`${testId}-icon`} />;
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
  }
);
