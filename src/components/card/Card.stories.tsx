import { Text } from '@audi/audi-ui-react-v2';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Price } from '../Price.js';
import Card, { CardProps } from './Card.js';

const examplePrice = '12.345.67 EUR';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: { inlineStories: false, iframeHeight: 200 },
  },
  argTypes: {
    // @todo: select handle does not work
    isSelected: {
      control: 'boolean',
    },
    onSelectCard: { action: 'clicked' },
    // @todo: select handle does not work
    children: { control: 'string' },
  },
} as ComponentMeta<typeof Card>;

export const Default: ComponentStory<typeof Card> = (args: CardProps) => {
  const [isSelected, setIsSelected] = useState<boolean | undefined>(
    Default.args?.isSelected,
  );

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };
  return (
    <Card
      {...args}
      onSelectCard={handleClick}
      onCtaClick={() => {
        // eslint-disable-next-line no-console
        console.log('CTA clicked');
      }}
      isSelected={isSelected}
    >
      <Text variant="copy2">{Default.args?.children}</Text>
    </Card>
  );
};

Default.args = {
  headline: 'Some Headline',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  ctaText: 'Some CTA Text',
  isSelected: false,
};

export const DefaultCardHeadline = () => (
  <Card.Headline>Example Headline</Card.Headline>
);

export const CardWithLongHeadline = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };
  return (
    <Card
      headline="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
      rowGap="16px"
      onSelectCard={handleClick}
      isSelected={isSelected}
    >
      <Price formattedValue={examplePrice} />
      <StyledLineclampedText>
        This card does NOT have a CTA
      </StyledLineclampedText>
    </Card>
  );
};

export const NonClickableCard = () => (
  <Card
    onCtaClick={() => {
      // eslint-disable-next-line no-console
      console.log('CTA clicked');
    }}
    headline="S line"
    ctaText="Technische Daten ansehen"
    rowGap="16px"
    data-testid="Card Example Test ID"
    // eslint-disable-next-line no-console
    ref={(ref) => console.log(ref)}
  >
    <Price formattedValue={examplePrice} fontWeight="bold" />
    <p>This card does NOT have the role `button`</p>
  </Card>
);

export const OverstyledCard = () => (
  <Card
    isShadowShown={false}
    paddingInline="0"
    paddingBlock="50px"
    onCtaClick={() => {
      // eslint-disable-next-line no-console
      console.log('CTA clicked');
    }}
    headline="S line"
    ctaText="Technische Daten ansehen"
    rowGap="16px"
  >
    <Price formattedValue={examplePrice} />
  </Card>
);

export const CardWithImage = () => (
  <Card
    onCtaClick={() => {
      // eslint-disable-next-line no-console
      console.log('CTA clicked');
    }}
    headline="S line"
    ctaText="Technische Daten ansehen"
    image={{
      src: 'https://mediaservice.audi.com/media/cdb/data/497a1ed1-056a-4884-b0c5-4d0c6a3c24c0.jpg',
      alt: 'alternative text',
    }}
  >
    <Price formattedValue={examplePrice} />
  </Card>
);

export const CardWithoutCTA = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };
  return (
    <Card
      headline="S line"
      rowGap="16px"
      onSelectCard={handleClick}
      isSelected={isSelected}
    >
      <Price formattedValue={examplePrice} />
      <p>This card does NOT have a CTA</p>
    </Card>
  );
};

export const CardWithoutHeadline = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <Card
      onSelectCard={handleClick}
      onCtaClick={() => {
        // eslint-disable-next-line no-console
        console.log('CTA clicked');
      }}
      isSelected={isSelected}
      ctaText="Technische Daten ansehen"
      rowGap="16px"
    >
      <Text variant="copy2">
        This card has its headline somewhere else than on top.
      </Text>
      <Card.Headline>Headline</Card.Headline>
      <Price formattedValue={examplePrice} />
      <Text variant="copy2">
        This achieved by omitting the optional `headline` prop of the Card and
        using the dedicated `CardHeadline` as a child of the Card itself.
      </Text>
    </Card>
  );
};

export const TrimlineCard = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <Card
      onSelectCard={handleClick}
      onCtaClick={() => {
        // eslint-disable-next-line no-console
        console.log('CTA clicked');
      }}
      isSelected={isSelected}
      headline="S line"
      ctaText="Mehr info"
      // testId="user-selection"
      data-testid="user-selection"
    >
      <Price formattedValue={examplePrice} />
      <Text variant="copy2">
        Steigen Sie ein in die Individualisierung Ihres Fahrzeugs: Attraktive
        Ausstattungen, Alltagstauglichkeit, gepaart mit höchster
        Qualitätsanmutung stehen hier im Fokus...
      </Text>
    </Card>
  );
};

export const EngineCard = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <Card
      onSelectCard={handleClick}
      onCtaClick={() => {
        // eslint-disable-next-line no-console
        console.log('CTA clicked');
      }}
      isSelected={isSelected}
      headline="S line"
      ctaText="Technische Daten ansehen"
      rowGap="16px"
    >
      <Price formattedValue={examplePrice} />
      <Card.DataItem
        key={123}
        value="5.7 seconds (in boost mode) / 6.6 seconds"
      >
        <Text variant="copy3" as="span">
          Acceleration 0-100 km/h
        </Text>
      </Card.DataItem>
      <p>2</p>
      <p>3</p>
      <p>4</p>
    </Card>
  );
};

const StyledCardWrapper = styled.div`
  background-color: #f6f6f6;
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 16px;
  scroll-snap-type: x mandatory;
`;

export const MultipleTrimlineCard = () => {
  const [selectedCard, setSelectedCard] = useState<string>('card1');

  const handleClick = (id: string) => {
    setSelectedCard(id);
  };

  return (
    <StyledCardWrapper>
      <Card
        isSelected={selectedCard === 'card1'}
        headline="Basic line"
        ctaText="Mehr info"
        onSelectCard={() => handleClick('card1')}
        onCtaClick={() => {
          // eslint-disable-next-line no-console
          console.log('CTA clicked');
        }}
      >
        <Price formattedValue={examplePrice} />
        <Text>
          Steigen Sie ein in die Individualisierung Ihres Fahrzeugs: Attraktive
          Ausstattungen, Alltagstauglichkeit, gepaart mit höchster
          Qualitätsanmutung stehen hier im Fokus...
        </Text>
      </Card>
      <Card
        onSelectCard={() => handleClick('card2')}
        onCtaClick={() => {
          // eslint-disable-next-line no-console
          console.log('CTA clicked');
        }}
        isSelected={selectedCard === 'card2'}
        headline="S line die neue Komfortlinie für sportliche Fahrer"
        ctaText="Mehr info"
      >
        <Price formattedValue={examplePrice} />
        <Text variant="copy2">
          Steigen Sie ein in die Individualisierung Ihres Fahrzeugs: short text
        </Text>
      </Card>
      <Card
        onSelectCard={() => handleClick('card3')}
        onCtaClick={() => {
          // eslint-disable-next-line no-console
          console.log('CTA clicked');
        }}
        isSelected={selectedCard === 'card3'}
        headline="Advanced line"
        ctaText="Mehr info"
      >
        <Price formattedValue={examplePrice} />
        <Text variant="copy2">
          Steigen Sie ein in die Individualisierung Ihres Fahrzeugs: Attraktive
          Ausstattungen, Alltagstauglichkeit, gepaart mit höchster
          Qualitätsanmutung stehen hier im Fokus...
        </Text>
      </Card>
    </StyledCardWrapper>
  );
};

export const Loading = () => (
  // eslint-disable-next-line no-console
  <Card
    headline="Some Headline"
    onSelectCard={() => console.log('selected')}
    isLoading
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation
  </Card>
);

const StyledLineclampedText = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipses;
  overflow: hidden;
  word-break: break-word;
`;
