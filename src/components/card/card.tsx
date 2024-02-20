import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';

import { ComponentCommonProps, Prettify } from '../../types/common-props.js';
import { CardCheckmark, CardCheckmarkProps } from './card.checkmark.tsx';
// TypeScript is NOT a bundler.
// Therefore, `card.cta.tsx` is imported AFTER it was transpiled into JS.
// Thus, in reality a JS file needs to be imprted. tcs will never alter import statements.
// Imports refer to the transpiled files.
import { CardCta } from './card.cta.tsx';
import { CardDataItem } from './card.data-item.tsx';
import { CardHeadline } from './card.headline.txs';
import {
  ClickArea,
  StyledCard,
  StyledCardHeader,
  StyledCardLayout,
  StyledCardLayoutProps,
  StyledCardProps,
} from './Card.styles.js';

export type CardProps = Prettify<
  StyledCardProps &
    Omit<StyledCardLayoutProps, 'type'> &
    ComponentCommonProps &
    HTMLAttributes<HTMLElement> & {
      checkmarkProps?: Omit<
        CardCheckmarkProps,
        'isSelected' | 'isLoading' | 'onSelect' | 'isSelectionDisabled'
      >;
      /** button text of CTA at the bottom of the Card */
      ctaText?: ReactNode;
      /**
       * If the headline should not be at the very top of the Card
       * but somewhere below another element inside the Card,
       * omit this prop and use the CardHeadline component as a child
       * of the Card at its desired position instead.
       */
      headline?: string;
      // image?: ImageProps;
      isHeadlineCapitalized?: boolean;
      isLoading?: boolean;
      /** true => displays the CheckIcon at the top right corner of the Card */
      isSelected?: boolean;
      isSelectionDisabled?: boolean;
      /** Callback function for clicklistener on CTA at the bottom of the Card */
      onCtaClick?: () => void;
      /** If no `onSelectCard` is passed as prop, the Card will not be selectable. */
      onSelectCard?: () => void;
      /**
       * 'row-gap' between all elements inside the card
       *
       * default = spacing.xs
       */
      rowGap?: string;
    }
>;

export const Card = forwardRef<HTMLDivElement, PropsWithChildren<CardProps>>(
  (
    {
      'data-testid': testId,
      onSelectCard,
      onCtaClick,
      isSelected = false,
      isSelectionDisabled = false,
      headline,
      isHeadlineCapitalized = true,
      ctaText,
      children,
      rowGap,
      isShadowShown = true,
      isLoading = false,
      paddingBlock,
      paddingInline,
      image,
      checkmarkProps,
      ...styledCardProps
    },
    ref,
  ) => {
    const isCardSelectable = Boolean(onSelectCard);
    const hasCta = onCtaClick && ctaText;

    const handleSelect = onSelectCard
      ? () => {
          if (isSelectionDisabled) return;

          onSelectCard();
        }
      : undefined;

    return (
      <StyledCard
        ref={ref}
        data-testid={testId}
        isShadowShown={isShadowShown}
        role="group"
        {...styledCardProps}
      >
        <StyledCardLayout
          paddingBlock={paddingBlock ?? 'm'}
          paddingInline={paddingInline ?? 'm'}
          rowGap={rowGap}
        >
          {/* TODO: follow accessibility guidelines to make the selection/click area accessible  */}
          <ClickArea
            rowGap={rowGap}
            onClick={handleSelect}
            data-testid={`${testId}-clickarea`}
          >
            {headline ? (
              <StyledCardHeader>
                <CardHeadline isCapitalized={isHeadlineCapitalized}>
                  {headline}
                </CardHeadline>
                {isCardSelectable || isSelected ? (
                  <CardCheckmark
                    data-testid={`${testId}-checkmark`}
                    {...checkmarkProps}
                    isSelected={isSelected}
                    isSelectionDisabled={isSelectionDisabled}
                    isLoading={isLoading}
                  />
                ) : null}
              </StyledCardHeader>
            ) : null}
            {children}
          </ClickArea>
          {hasCta ? <CardCta onClick={onCtaClick}>{ctaText}</CardCta> : null}
        </StyledCardLayout>
      </StyledCard>
    );
  },
);

const CompoundCard = Object.assign(Card, {
  Layout: StyledCardLayout,
  Header: StyledCardHeader,
  Headline: CardHeadline,
  Checkmark: CardCheckmark,
  Cta: CardCta,
  DataItem: CardDataItem,
});

export default CompoundCard;
