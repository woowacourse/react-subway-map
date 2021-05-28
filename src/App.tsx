import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Button, Main, Menu, RootContainer, Title, Video } from './components/atoms';
import { HostSelect } from './components/molecules';
import { Home, Line, Login, Logout, Section, SignUp, Station } from './components/pages';
import { ROUTE } from './constants';
import { getSignedUserAsync } from './features/signedUserSlice';
import { RootState, useAppDispatch } from './store';
import subwayVideo from './assets/video/subwayBackground.mp4';
import { setAccessToken, initialState as initialAccessToken } from './features/accessTokenSlice';

interface ConditionalRouteProps {
  exact?: boolean;
  path: string;
  Component: React.ComponentType;
  condition: boolean;
}

const ConditionalRoute = ({ exact, path, Component, condition }: ConditionalRouteProps) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (condition ? <Component /> : <Redirect to={ROUTE.HOME} />)}
    />
  );
};

const App = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const {
    signedUserState,
    accessTokenState: { accessToken },
    hostState: { host },
  } = useSelector((state: RootState) => ({
    signedUserState: state.signedUserReducer,
    accessTokenState: state.accessTokenReducer,
    hostState: state.hostReducer,
  }));

  useEffect(() => {
    if (signedUserState?.isError === true) {
      dispatch(setAccessToken(initialAccessToken));
    }
  }, [signedUserState]);

  useEffect(() => {
    dispatch(getSignedUserAsync({ host, accessToken }));
  }, []);

  const LoginedMenu = (
    <>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => history.push({ pathname: ROUTE.STATION })}
      >
        🚇 역 관리
      </Button>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => history.push({ pathname: ROUTE.LINE })}
      >
        🚇 노선 관리
      </Button>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => history.push({ pathname: ROUTE.SECTION })}
      >
        🚇 구간 관리
      </Button>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => {
          history.replace({ pathname: ROUTE.LOGOUT });
        }}
      >
        🔒 로그아웃
      </Button>
    </>
  );

  const UnLoginedMenu = (
    <>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => history.push({ pathname: ROUTE.LOGIN })}
      >
        🔑 로그인
      </Button>
    </>
  );

  return (
    <RootContainer>
      <Video src={subwayVideo} loop autoPlay muted />
      <Title>
        <Link to={ROUTE.HOME}>지하철 노선도</Link>
      </Title>
      <Menu>{signedUserState.id ? LoginedMenu : UnLoginedMenu}</Menu>
      <Main>
        <Switch>
          <Route exact path={ROUTE.HOME} component={Home} />

          <ConditionalRoute
            exact
            path={ROUTE.STATION}
            Component={Station}
            condition={!!signedUserState.id}
          />
          <ConditionalRoute
            exact
            path={ROUTE.LINE}
            Component={Line}
            condition={!!signedUserState.id}
          />
          <ConditionalRoute
            exact
            path={ROUTE.SECTION}
            Component={Section}
            condition={!!signedUserState.id}
          />
          <ConditionalRoute
            exact
            path={ROUTE.LOGOUT}
            Component={Logout}
            condition={!!signedUserState.id}
          />

          <ConditionalRoute
            exact
            path={ROUTE.SIGNUP}
            Component={SignUp}
            condition={!signedUserState.id}
          />
          <ConditionalRoute
            exact
            path={ROUTE.LOGIN}
            Component={Login}
            condition={!signedUserState.id}
          />

          <Redirect to={ROUTE.HOME} />
        </Switch>
      </Main>
      <HostSelect />
    </RootContainer>
  );
};

export default App;
