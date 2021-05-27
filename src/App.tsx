import React, { useEffect } from 'react';
import { requestGetUser } from 'modules/authSlice';
import { useAppDispatch } from 'modules/hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import BaseLayout from 'components/BaseLayout/BaseLayout';
import { LandingPage, StationPage, LinePage, SectionPage, LoginPage, SignupPage } from 'pages';
import ROUTE from 'constants/routes';
import { globalStyle, theme } from 'App.styles';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessTokenJSON = sessionStorage.getItem('accessToken');
    if (accessTokenJSON) {
      dispatch(requestGetUser(JSON.parse(accessTokenJSON)));
    }
  }, []);

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
              <Route path={ROUTE.LOGIN} component={LoginPage} />
              <Route path={ROUTE.SIGNUP} component={SignupPage} />
            </Switch>
          </BaseLayout>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
