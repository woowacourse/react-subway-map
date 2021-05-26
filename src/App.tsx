import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Button, Main, Menu, RootContainer, Title } from './components/atoms';
import { HostSelect } from './components/molecules';
import { Home, Login, SignUp, Station, Line } from './components/pages';
import { ROUTE } from './constants';
import { setAccessToken } from './features/accessTokenSlice';
import { getSignedUserAsync, setSignedUser } from './features/signedUserSlice';
import { RootState, useAppDispatch } from './store';

const App = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const {
    signedUser: { id: signedUserId },
    accessTokenState: { accessToken },
    hostState: { host },
  } = useSelector((state: RootState) => ({
    signedUser: state.signedUserReducer,
    accessTokenState: state.accessTokenReducer,
    hostState: state.hostReducer,
  }));

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
        역 관리
      </Button>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => history.push({ pathname: ROUTE.LINE })}
      >
        노선 관리
      </Button>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => history.push({ pathname: ROUTE.SECTION })}
      >
        구간 관리
      </Button>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => {
          dispatch(setAccessToken({ accessToken: null, isError: null, text: null, status: null }));
          dispatch(
            setSignedUser({
              id: null,
              email: null,
              age: null,
              isError: null,
              text: null,
              status: null,
            }),
          );
        }}
      >
        로그아웃
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
        로그인
      </Button>
    </>
  );

  return (
    <RootContainer>
      <Title>
        <Link to={ROUTE.HOME}>지하철 노선도</Link>
      </Title>
      <Menu>{signedUserId ? LoginedMenu : UnLoginedMenu}</Menu>
      <Main>
        <Switch>
          <Route exact path={ROUTE.HOME} component={Home} />
          <Route exact path={ROUTE.SIGNUP} component={SignUp} />
          <Route exact path={ROUTE.LOGIN} component={Login} />
          <Route exact path={ROUTE.STATION} component={Station} />
          <Route exact path={ROUTE.LINE} component={Line} />
          <Route component={() => <Redirect to={ROUTE.HOME} />} />
        </Switch>
      </Main>
      <HostSelect />
    </RootContainer>
  );
};

export default App;
