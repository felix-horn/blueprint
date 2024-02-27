import { FC, Fragment } from 'react';
import { render } from 'react-dom';
import { styled } from 'styled-components';

import { Card, CardProps } from './components/card/card.js';
import { GlobalStyle } from './global-styles.js';

const StyledBackground = styled.div`
  background: #f2f2f2;
  padding: 20px;
`;

const App: FC<CardProps> = () => (
  <Fragment>
    <GlobalStyle />
    <StyledBackground>
      <Card headline="The Card's Headline">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Card>
    </StyledBackground>
  </Fragment>
);

render(<App />, document.body);
