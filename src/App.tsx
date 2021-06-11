import { useContext, useState } from 'react';
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

const RouterConfig = [
  {
    path: PATH.LOGIN,
    Component: LoginPage,
  },
  {
    path: PATH.SIGNUP,
    Component: SignupPage,
  },
  {
    path: [PATH.STATIONS, PATH.ROOT],
    Component: StationPage,
  },
  {
    path: PATH.LINES,
    Component: LinePage,
  },
  {
    path: PATH.SECTIONS,
    Component: SectionPage,
  },
  {
    path: PATH.MAP,
    Component: MapPage,
  },
];

const NavConfig = [
  {
    path: PATH.STATIONS,
    text: '역관리',
  },
  {
    path: PATH.LINES,
    text: '노선관리',
  },
  {
    path: PATH.SECTIONS,
    text: '구간관리',
  },
  {
    path: PATH.MAP,
    text: '전체보기',
  },
];

const App = () => {
  const history = useHistory();

  const addMessage = useContext(SnackBarContext)?.pushMessage;
  const userContext = useContext(UserContext);
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE_100;

  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    await userContext?.setIsLoggedIn(false);

    addMessage?.(SUCCESS_MESSAGE.LOGOUT);
    history.push(PATH.LOGIN);
  };

  return (
    <>
      <Header backgroundColor={themeColor} color={PALETTE.WHITE_100}>
        <Link to={PATH.ROOT}>
          <TextLogo height="2rem" />
        </Link>
        <NavBar>
          {NavConfig.map(({ path, text }) => (
            <NavLink to={path}>{text}</NavLink>
          ))}
          {userContext?.isLoggedIn ? (
            <button onClick={onLogout}>로그아웃</button>
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
          {RouterConfig.map(({ path, Component }) => (
            <Route exact path={path} render={() => <Component setIsLoading={setIsLoading} />} />
          ))}
          <Redirect to={PATH.ROOT} />
        </Switch>
      </Main>
      <ApiSwitch />
      <Spinner isLoading={isLoading} />
    </>
  );
};

export default App;
