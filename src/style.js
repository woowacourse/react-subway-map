import { createGlobalStyle } from 'styled-components';

import { COLOR } from './constants';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    color: ${COLOR.TEXT.DEFAULT};
  }

  #root {
    font-family: 'Noto Sans KR', sans-serif;
    height: 100%;
  }


  ul,ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    outline: none;
    color: black;

    &:link,
    &:visited,
    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
    }
  }

  button {
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;

    &:disabled {
      cursor: default;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

`;
