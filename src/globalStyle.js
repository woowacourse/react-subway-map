import { createGlobalStyle } from 'styled-components';
import { COLOR } from './constants';

const GlobalStyle = createGlobalStyle`
:root{
  /* Font Size */
  --size-large: 24px;
  --size-semi-large: 20px;
  --size-medium: 18px;
  --size-regular: 16px;
  --size-small: 12px;

  /* Font weight */
  --weight-bold: 700;
  --weight-semi-bold: 500;
  --weight-regular: 400;
  --weight-small: 300;

  /* Box Shadow */
  --shadow-page: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-button: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px
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
