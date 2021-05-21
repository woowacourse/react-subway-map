import { css, Theme } from '@emotion/react';

export const globalStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap');

  #root {
    font-family: 'Noto Sans KR', sans-serif;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    color: #333333;
    background-color: #faf1e6;
  }

  * {
    box-sizing: border-box;
  }

  ul {
    list-style: none;
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

  button {
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
    &[disabled] {
      cursor: not-allowed;
    }
  }
`;

export const theme: Theme = {
  bgColor: {
    defaultWhite: '#fff',
    defaultCream: '#faf1e6',
  },
  color: {
    subwayYellow: '#ffcb0a',
    subwayGreen: '#009743',
  },
};
