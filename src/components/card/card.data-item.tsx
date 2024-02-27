import { forwardRef, PropsWithChildren } from 'react';

import { ComponentCommonProps } from '../../types/common-props.js';
import { Text } from '../text/text.js';
import {
  StyledDataItem,
  StyledDataItemValue,
  StyledValueUnitPair,
} from './card.styles.js';

export type DataItemProps = ComponentCommonProps & {
  label?: string;
  unit?: string;
  value: string;
};

export const CardDataItem = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DataItemProps>
>(({ testId, children, value, unit, label }, ref) => (
  <StyledDataItem ref={ref} data-testid={testId}>
    <StyledValueUnitPair>
      <StyledDataItemValue weight="bold">{value}</StyledDataItemValue>
      {unit ? <Text>{unit}</Text> : null}
    </StyledValueUnitPair>
    {label ? <Text>{label}</Text> : null}
    {children}
  </StyledDataItem>
));

export default CardDataItem;
