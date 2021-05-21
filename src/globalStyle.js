import { createGlobalStyle } from 'styled-components';
import { COLOR } from './constants';

const GlobalStyle = createGlobalStyle`
:root{
  /* Font weight */
  --weight-bold: 700;
  --weight-semi-bold: 500;
  --weight-regular: 400;
  --weight-small: 300;

  /* Box Shadow */
  --shadow-page: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-button: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
}

/* Universal tags */
* {
    font-family: 'Noto Sans KR', sans-serif;
    color: ${COLOR.GRAY_500};
    box-sizing: border-box;
    margin:0;
    padding:0;
  }

  html, body {
    height: 100%;
    cursor: default;
  }

  #root {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;

    &:visited {
      color: inherit;
    }
  }

  li {
    list-style: none;
  }

  button {
    cursor: pointer;
    background: transparent;
    border: 0;
  }
`;

export default GlobalStyle;
