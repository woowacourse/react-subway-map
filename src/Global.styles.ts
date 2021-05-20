import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, div, span, 
  h1, h2, h3, h4, h5, h6, p, 
  a, img,b, u, i, ol, ul, li, form, label, 
  article,canvas ,figure, figcaption, footer, header, nav{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  footer, header, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
    
    &:visited {
      color: inherit;
    }
  }

  button {
    background: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
