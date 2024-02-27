import { FC, Fragment } from 'react';
import { render } from 'react-dom';
import { styled } from 'styled-components';

import { Form } from './components/signup-form/signup-form.js';
import { GlobalStyle } from './global-styles.js';

const StyledBackground = styled.div`
  background: #fff;
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
