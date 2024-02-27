import { css, styled } from 'styled-components';

import { Text } from '../text/text.js';

// These props are reused in Card.styles.tsx and are therefore defined separately from the ones below.
export type StyledCardProps = {
  /** If the box shadow is not needed then this prop can be set to false */
  isShadowShown?: boolean;
};

export const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  /* @todo: check original after theming */
  background-color: #fff;
  /* Why ist "StyledCardProps" needed here but not in the original? */
  box-shadow: ${({ isShadowShown }: StyledCardProps) =>
    isShadowShown ? '1px 1px 8px rgba(0, 0, 0, 0.03)' : 'none'};
`;

export type StyledCardLayoutProps = {
  paddingBlock?: string;
  paddingInline?: string;
  rowGap?: string;
  type?: 'grid' | 'row' | 'column';
};

export const StyledCardLayout = styled.div<StyledCardLayoutProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-wrap: anywhere;
  padding-inline: ${({ paddingInline }) => paddingInline};
  padding-block: ${({ paddingBlock }) => paddingBlock};
  row-gap: ${({ rowGap }) => rowGap};
`;

export const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  /* @todo: check original after theming */
  overflow-wrap: anywhere;
`;

export const StyledCardHeadline = styled(Text)<{ isCapitalized?: boolean }>`
  flex-grow: 1;

  ${({ isCapitalized = false }) => {
    if (!isCapitalized) return '';

    return `
      &:first-letter {
        text-transform: capitalize;
      }
    `;
  }}
`;

export const StyledDataItemValue = styled(Text)`
  white-space: normal;
`;

const CHECKMARK_SIZE = 24;
const CHECKMARK_CLIKCLABLE_AREA_SIZE = 48;

export type StyledCheckmarkProps = {
  isLoading?: boolean;
  isSelected?: boolean;
  isSelectionDisabled?: boolean;
};

// @TODO use Button from audi-ui-react when it supports loading/icon
export const StyledCheckmark = styled.div<StyledCheckmarkProps>`
  --size: ${CHECKMARK_SIZE}px;

  position: relative;
  display: flex;
  align-items: center;
  min-width: var(--size);
  min-height: var(--size);
  width: var(--size);
  height: var(--size);
  border-radius: 100%;
  box-sizing: border-box; // To hold dimensions when border is applied
  ${({ onClick, isSelectionDisabled }) =>
    !isSelectionDisabled && onClick ? 'cursor: pointer;' : ''}

  ${({ isSelected = false, isLoading = false }) => {
    if (isLoading) return undefined;

    if (isSelected) {
      return css`
        background-color: var(${({ theme }) => theme.colors.ui.success});
        color: var(${({ theme }) => theme.colors.base.brand.white});
      `;
    }

    return css`
      border: solid 1px var(${({ theme }) => theme.colors.base.grey[100]});
    `;
  }}
`;

type StyledCheckmarkClickAreaProps = {
  isLoading?: boolean;
  isSelectionDisabled?: boolean;
};

// Bigger clickable area for mobile
export const StyledCheckmarkClickArea = styled.div<StyledCheckmarkClickAreaProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${CHECKMARK_CLIKCLABLE_AREA_SIZE}px;
  height: ${CHECKMARK_CLIKCLABLE_AREA_SIZE}px;
  cursor: pointer;
  ${({ onClick, isSelectionDisabled, isLoading }) =>
    !onClick || isSelectionDisabled || isLoading ? 'display: none;' : ''}

  @media (min-width: ${({ theme }) => theme.breakpoints.l}px) {
    display: none;
  }
`;

export const StyledCtaButton = styled.button`
  align-self: start;
  margin-top: auto;
`;

export const StyledDataItem = styled.div`
  display: flex;
  flex-direction: column;
  word-break: break-word;
  hyphens: auto;
`;

export const StyledValueUnitPair = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  column-gap: 5px;
  white-space: nowrap;
`;
