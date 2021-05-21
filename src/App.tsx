import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import BaseLayout from 'components/BaseLayout/BaseLayout';
import { LandingPage, StationPage, LinePage, SectionPage } from 'pages';
import ROUTE from 'constants/routes';
import { globalStyle, theme } from 'App.styles';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <Router>
          <BaseLayout>
            <Switch>
              <Route exact path={ROUTE.HOME} component={LandingPage} />
              <Route path={ROUTE.STATIONS} component={StationPage} />
              <Route path={ROUTE.LINES} component={LinePage} />
              <Route path={ROUTE.SECTIONS} component={SectionPage} />
            </Switch>
          </BaseLayout>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
