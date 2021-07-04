import { useContext } from 'react';
import { Switch, Route, Link, NavLink, Redirect, useHistory } from 'react-router-dom';

import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import ApiSwitch from './components/ApiSwitch/ApiSwitch';
import { Spinner, Main } from './components/shared';

import { LoginPage, SignupPage, StationPage, LinePage, SectionPage, MapPage } from './pages';

import { ThemeContext } from './contexts/ThemeContextProvider';
import { UserContext } from './contexts/UserContextProvider';
import { SnackBarContext } from './contexts/SnackBarProvider';

import PATH from './constants/path';
import PALETTE from './constants/palette';
import { SUCCESS_MESSAGE } from './constants/messages';

import { ReactComponent as TextLogo } from './assets/images/ww-subway-logo-text.svg';
import { LoadingContext } from './contexts/LoadingContext';

const App = () => {
  const history = useHistory();

  const addMessage = useContext(SnackBarContext)?.addMessage;
  const userContext = useContext(UserContext);
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const isLoading = useContext(LoadingContext)?.isLoading;

  const onLogout = async () => {
    userContext?.logout();

    addMessage?.(SUCCESS_MESSAGE.LOGOUT);
    history.push(PATH.LOGIN);
  };

  return (
    <>
      <Header backgroundColor={themeColor} color={PALETTE.WHITE}>
        <Link to={PATH.ROOT}>
          <TextLogo height="32px" />
        </Link>
        <NavBar>
          <NavLink to={PATH.STATIONS}>역관리</NavLink>
          <NavLink to={PATH.LINES}>노선관리</NavLink>
          <NavLink to={PATH.SECTIONS}>구간관리</NavLink>
          <NavLink to={PATH.MAP}>전체보기</NavLink>
          {userContext?.isLoggedIn ? (
            <button
              onClick={() => {
                onLogout();
              }}
            >
              로그아웃
            </button>
          ) : (
            <>
              <NavLink to={PATH.LOGIN}>로그인</NavLink>
              <NavLink to={PATH.SIGNUP}>회원가입</NavLink>
            </>
          )}
        </NavBar>
      </Header>
      <Main>
        <Switch>
          <Route exact path={PATH.LOGIN} render={() => <LoginPage />} />
          <Route exact path={PATH.SIGNUP} render={() => <SignupPage />} />
          <Route exact path={[PATH.STATIONS, PATH.ROOT]} render={() => <StationPage />} />
          <Route exact path={PATH.LINES} render={() => <LinePage />} />
          <Route exact path={PATH.SECTIONS} render={() => <SectionPage />} />
          <Route exact path={PATH.MAP} render={() => <MapPage />} />
          <Redirect to={PATH.ROOT} />
        </Switch>
      </Main>
      <ApiSwitch />
      <Spinner isLoading={isLoading ?? false} />
    </>
  );
};

export default App;
