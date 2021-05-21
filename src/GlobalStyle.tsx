import { css, Global } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;

        min-height: 100vh;
        width: 100%;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        font-size: 1rem;
        margin: 0;
        padding: 0;
      }

      a {
        text-decoration: none;
        outline: none;
        color: black;
        &:hover,
        &:active,
        &:visited,
        &:focus {
          text-decoration: none;
        }
      }
    `}
  />
);

export default GlobalStyle;
