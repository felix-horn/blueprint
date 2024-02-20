import { forwardRef, PropsWithChildren } from 'react';

import { ComponentCommonProps } from '../../types/commonProps';
import {
  StyledDataItem,
  StyledDataItemValue,
  StyledValueUnitPair,
} from './Card.styles.js';

export type DataItemProps = PropsWithChildren<
  ComponentCommonProps & {
    value: string;
    unit?: string;
    label?: string;
  }
>;

export const CardDataItem = forwardRef<HTMLDivElement, DataItemProps>(
  ({ 'data-testid': testId, children, value, unit, label }, ref) => (
    <StyledDataItem ref={ref} data-testid={testId}>
      <StyledValueUnitPair>
        <StyledDataItemValue variant="copy1" weight="bold">
          {value}
        </StyledDataItemValue>
        {unit ? <Text variant="copy2">{unit}</Text> : null}
      </StyledValueUnitPair>
      {label ? (
        <Text variant="copy3" as="p">
          {label}
        </Text>
      ) : null}
      {children}
    </StyledDataItem>
  ),
);

export default CardDataItem;
