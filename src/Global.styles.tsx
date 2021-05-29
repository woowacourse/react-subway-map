import { Global, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import { COLOR } from './constants/styleConstant';

const globalStyles = css`
  ${emotionNormalize}
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap');
  * {
    box-sizing: border-box;
  }
  html,
  body {
    padding: 0;
    margin: 0;
    background: white;
    min-height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
    color: ${COLOR.TEXT_COLOR};
  }
  @media screen and (max-width: 1280px) {
    html {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 768px) {
    html {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 500px) {
    html {
      font-size: 8px;
    }
  }

  input {
    border-style: solid;
  }

  a {
    text-decoration: none;
    color: ${COLOR.TEXT_COLOR};
    text-decoration: none;
    outline: none;

    &:hover,
    &:active {
      text-decoration: none;
    }
  }

  select {
    background: url('assets/arrow.svg') no-repeat;
    background-position: right;
    background-size: 1rem;
    background-origin: content-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};

export default GlobalStyles;
