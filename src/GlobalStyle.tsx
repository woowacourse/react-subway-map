import { createGlobalStyle } from 'styled-components';

export const theme = {
  color: {
    bg: {
      primary: {
        default: '#FCCB00',
        active: '#f5c600',
      },
      secondary: {
        active: 'rgba(0, 0, 0, 0.07)',
      },
    },
    text: {
      primary: '#404040',
      link: '#2980b9',
    },
    border: {
      primary: '#7E7E7E',
      secondary: '#cccccc',
    },
  },
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: ${theme.color.text.primary};
  }

  a {
    color: ${theme.color.text.link};
    text-decoration: none;

    &:hover, &:active {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyle;
