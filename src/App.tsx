import { Button, Menu, Main, RootContainer, Title } from './components/atoms';

import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import { Home, SignUp, Login } from './components/pages';

import { ROUTE } from './constants';
import { useSelector } from 'react-redux';
import { getSignedUserAsync } from './features/signedUserSlice';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from './store';

const App = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useSelector((state: RootState) => state.accessTokenReducer);

  useEffect(() => {
    dispatch(getSignedUserAsync(accessToken));
  }, []);

  return (
    <Router>
      <RootContainer>
        <Title>
          <Link to={ROUTE.HOME}>지하철 노선도</Link>
        </Title>
        <Main>
          <Switch>
            <Route exact path={ROUTE.HOME} component={Home} />
            <Route exact path={ROUTE.SIGNUP} component={SignUp} />
            <Route exact path={ROUTE.LOGIN} component={Login} />
            <Route component={() => <Redirect to={ROUTE.HOME} />} />
          </Switch>
        </Main>
      </RootContainer>
    </Router>
  );
};

export default App;
