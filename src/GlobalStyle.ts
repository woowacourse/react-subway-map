import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
  
  * {
    font-family: 'Nanum Gothic', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
  }

  button {
    outline: none;
    cursor: pointer;
    background: none;
  }

  a {
    outline: none;
    text-decoration: none;
    color: inherit;
  }

  input, select {
    outline: none;
  }

  ol, ul {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export default GlobalStyle;
