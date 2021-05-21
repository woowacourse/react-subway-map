import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Header, Navbar } from './components';
import GlobalStyle, { theme } from './GlobalStyle';
import Routes from './routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header>
          <Navbar />
        </Header>
        <Routes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
