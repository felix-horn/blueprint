import { FC, Fragment } from 'react';
import { render } from 'react-dom';
import { styled } from 'styled-components';

import { GlobalStyle } from './global-styles.js';
import { Form } from './signum-form.js';

const StyledBackground = styled.div`
  background: #f2f2f2;
  padding: 20px;
`;

const App: FC = () => (
  <Fragment>
    <GlobalStyle />
    <StyledBackground>
      <Form />
    </StyledBackground>
  </Fragment>
);

render(<App />, document.body);
