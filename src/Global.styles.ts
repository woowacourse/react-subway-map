import { createGlobalStyle, css } from "styled-components";
import { normalize } from "styled-normalize";

import { COLOR } from "./constants";

const customNormalize = css`
  html,
  body,
  ul {
    margin: 0;
    height: 100%;
    font-size: 16px;
    padding: 0;
  }

  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  li,
  ul {
    list-style: none;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${customNormalize}

  html,
  body {
    font-family: 'BMJUA';
    background-color: ${COLOR.GRAY_200};
  }

  @font-face {
    font-family: 'BMJUA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

export default GlobalStyle;
