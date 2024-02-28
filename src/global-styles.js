import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Source, Open-Sans, Helvetica, Sans-Serif;

    --spacing-s: 5px;
    --spacing-m: 10px;
    --spacing-l: 15px;
    --spacing-xl: 20px;
  }

`;
