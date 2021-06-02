import React, { useEffect } from 'react';
import { requestGetUser } from 'modules/authSlice';
import { useAppDispatch } from 'modules/hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import BaseLayout from 'components/BaseLayout/BaseLayout';
import {
  LandingPage,
  StationPage,
  LinePage,
  SectionPage,
  MapPage,
  LoginPage,
  SignupPage,
} from 'pages';
import { selectServer } from 'modules/serverSlice';
import ROUTE from 'constants/routes';
import { globalStyle } from 'App.styles';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const serverJSON = sessionStorage.getItem('server');
    const accessTokenJSON = sessionStorage.getItem('accessToken');

    if (serverJSON && accessTokenJSON) {
      dispatch(selectServer({ server: JSON.parse(serverJSON) }));
      dispatch(requestGetUser(JSON.parse(accessTokenJSON)));
    }
  }, []);

  return (
    <>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        maxSnack={3}
      >
        <Global styles={globalStyle} />
        <Router>
          <BaseLayout>
            <Switch>
              <Route exact path={ROUTE.HOME} component={LandingPage} />
              <Route path={ROUTE.STATIONS} component={StationPage} />
              <Route path={ROUTE.LINES} component={LinePage} />
              <Route path={ROUTE.SECTIONS} component={SectionPage} />
              <Route path={ROUTE.MAP} component={MapPage} />
              <Route path={ROUTE.LOGIN} component={LoginPage} />
              <Route path={ROUTE.SIGNUP} component={SignupPage} />
            </Switch>
          </BaseLayout>
        </Router>
      </SnackbarProvider>
    </>
  );
};

export default App;
