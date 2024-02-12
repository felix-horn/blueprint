import * as React from 'react';
import { render } from '../../test/test-utils';
import Card, { CardProps } from './Card';

describe('Card', () => {
  const onClickMock = jest.fn();
  const defaultProps: CardProps = {
    ctaText: 'CTA Text',
    headline: 'Card Headline',
    onSelectCard: onClickMock,
    onCtaClick: onClickMock,
    'data-testid': 'base-card',
    isSelected: false,
  };

  it('should render without breaking', () => {
    const { getByTestId } = render(<Card {...defaultProps} />);

    expect(getByTestId('base-card')).toBeDefined();
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <Card {...defaultProps}>
        <span data-testid="children" />
      </Card>
    );

    expect(getByTestId('children')).toBeDefined();
  });

  it('should render the headline', () => {
    const { getByTestId } = render(<Card {...defaultProps} />);

    expect(getByTestId('base-card')?.textContent).toContain('Card Headline');
  });

  it('should render the checkmark icon when selected', () => {
    const props: CardProps = {
      ...defaultProps,
      isSelected: true,
    };
    const { getByTestId } = render(<Card {...props} />, {});

    expect(getByTestId('base-card-checkmark-icon')).not.toBeNull();
  });

  it('should render no checkmark icon when selected but no headline is given', () => {
    const props: CardProps = {
      ...defaultProps,
      headline: undefined,
      isSelected: true,
    };
    const { queryByTestId } = render(<Card {...props} />);

    expect(queryByTestId('base-card-checkmark-icon')).toBeNull();
  });

  it('should render no checkmark icon when not selected', () => {
    const props: CardProps = {
      ...defaultProps,
      isSelected: false,
    };
    const { queryByTestId } = render(<Card {...props} />);

    expect(queryByTestId('base-card-checkmark-icon')).toBeNull();
  });

  it('should render the cta text if supplied as a string ', () => {
    const props: CardProps = {
      ...defaultProps,
      ctaText: 'some text',
    };
    const { getByTestId } = render(<Card {...props} />);

    expect(getByTestId('base-card')?.querySelector('button')?.textContent).toStrictEqual(
      'some text'
    );
  });

  it('should render the cta text if supplied as a react node', () => {
    const props: CardProps = {
      ...defaultProps,
      ctaText: React.createElement('div', { className: 'someClass' }),
    };
    const { getByTestId } = render(<Card {...props} />);

    expect(getByTestId('base-card')?.querySelector('button div.someClass')).not.toBeNull();
  });

  it('should render no cta when no cta text is given', () => {
    const props: CardProps = {
      ...defaultProps,
      ctaText: undefined,
    };
    const { queryByTestId } = render(<Card {...props} />);

    expect(queryByTestId('base-card')?.querySelector('button')).toBeNull();
  });

  it('should render no cta when no click handler  and cta text is given', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onCtaClick, ctaText, ...props } = defaultProps;

    const { queryByTestId } = render(<Card {...props} />);

    expect(queryByTestId('base-card')?.querySelector('button')).toBeNull();
  });
});
