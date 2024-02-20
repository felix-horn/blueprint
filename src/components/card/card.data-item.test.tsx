import { describe, expect, it } from '@jest/globals';

import { render } from '../../test/test-utils';
import Card from './Card.js';

describe('Card.DataItem', () => {
  const defaultProps = {
    'data-testid': 'someTestId',
    value: 'someValue',
  };

  it('should render without breaking', () => {
    const { getByTestId } = render(<Card.DataItem {...defaultProps} />);

    expect(getByTestId('someTestId')).toBeDefined();
  });

  it('should render the children', () => {
    const { getByTestId } = render(
      <Card.DataItem {...defaultProps}>
        <span data-testid="children" />
      </Card.DataItem>,
    );

    expect(getByTestId('children')).toBeDefined();
  });

  it('should render the label', () => {
    const props = {
      ...defaultProps,
      label: 'someLabel',
    };
    const { getByTestId } = render(<Card.DataItem {...props} />);

    expect(getByTestId('someTestId').textContent).toContain('someLabel');
  });

  it('should render the unit', () => {
    const props = {
      ...defaultProps,
      unit: 'someUnit',
    };
    const { getByTestId } = render(<Card.DataItem {...props} />);

    expect(getByTestId('someTestId').textContent).toContain('someUnit');
  });

  it('should render the value', () => {
    const props = {
      ...defaultProps,
    };
    const { getByTestId } = render(<Card.DataItem {...props} />);

    expect(getByTestId('someTestId').textContent).toContain('someValue');
  });
});
