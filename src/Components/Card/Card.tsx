import React, { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import { ComponentCommonProps } from '../../types/commonProps';
import {
  StyledCard,
  StyledCardLayout,
  StyledCardProps,
  StyledCardLayoutProps,
  StyledCardHeader,
  ClickArea,
} from './Card.styles';
import { Prettify } from '../../types/utils';
import { CardCheckmark, CardCheckmarkProps } from './Card.Checkmark';
import { CardHeadline } from './Card.Headline';
import { CardCta } from './Card.Cta';
import { CardDataItem } from './Card.DataItem';
import { Image, ImageProps } from '../Image';

export type CardProps = Prettify<
  StyledCardProps &
    Omit<StyledCardLayoutProps, 'type'> &
    ComponentCommonProps &
    HTMLAttributes<HTMLElement> & {
      /**
       * If the headline should not be at the very top of the Card
       * but somewhere below another element inside the Card,
       * omit this prop and use the CardHeadline component as a child
       * of the Card at its desired position instead.
       */
      headline?: string;
      isHeadlineCapitalized?: boolean;
      /**
       * 'row-gap' between all elements inside the card
       *
       * default = spacing.xs
       */
      rowGap?: string;
      /** Callback function for clicklistener on CTA at the bottom of the Card */
      onCtaClick?: () => void;
      /** button text of CTA at the bottom of the Card */
      ctaText?: React.ReactNode;
      /** If no `onSelectCard` is passed as prop, the Card will not be selectable. */
      onSelectCard?: () => void;
      /** true => displays the CheckIcon at the top right corner of the Card */
      isSelected?: boolean;
      isSelectionDisabled?: boolean;
      isLoading?: boolean;
      image?: ImageProps;
      checkmarkProps?: Omit<
        CardCheckmarkProps,
        'isSelected' | 'isLoading' | 'onSelect' | 'isSelectionDisabled'
      >;
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
    ref
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
        {image ? <Image {...image} /> : null}
        <StyledCardLayout
          paddingBlock={paddingBlock ?? 'm'}
          paddingInline={paddingInline ?? 'm'}
          rowGap={rowGap}
        >
          {/* TODO: follow accessibility guidelines to make the selection/click area accessible  */}
          <ClickArea rowGap={rowGap} onClick={handleSelect} data-testid={`${testId}-clickarea`}>
            {headline ? (
              <StyledCardHeader>
                <CardHeadline isCapitalized={isHeadlineCapitalized}>{headline}</CardHeadline>
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
  }
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
