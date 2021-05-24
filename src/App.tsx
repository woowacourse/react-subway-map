import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';

import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Main from './components/shared/Main/Main';
import PATH from './constants/path';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import StationPage from './pages/StationPage/StationPage';
import LinePage from './pages/LinePage/LinePage';
import SectionPage from './pages/SectionPage/SectionPage';
import { ReactComponent as TextLogo } from './assets/images/ww-subway-logo-text.svg';
import PALETTE from './constants/palette';
import { ThemeContext } from './contexts/ThemeContextProvider';
import { UserContext } from './contexts/UserContextProvider';
import { SnackBarContext } from './contexts/SnackBarProvider';
import { SUCCESS_MESSAGE } from './constants/messages';

const App = () => {
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const userContext = useContext(UserContext);
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;

  const onLogout = () => {
    localStorage.setItem('accessToken', '');
    userContext?.setIsLoggedIn(false);
    addMessage?.(SUCCESS_MESSAGE.LOGOUT);
  };

  return (
    <Router>
      <Header backgroundColor={themeColor} color={PALETTE.WHITE}>
        <Link to={PATH.ROOT}>
          <TextLogo height="2rem" />
        </Link>
        <NavBar>
          <NavLink to={PATH.STATIONS}>역관리</NavLink>
          <NavLink to={PATH.LINES}>노선관리</NavLink>
          <NavLink to={PATH.SECTIONS}>구간관리</NavLink>
          {userContext?.isLoggedIn ? (
            <button onClick={onLogout}>로그아웃</button>
          ) : (
            <NavLink to={PATH.LOGIN}>로그인</NavLink>
          )}
        </NavBar>
      </Header>
      <Main>
        <Switch>
          <Route exact path={PATH.ROOT}>
            ROOT
          </Route>
          <Route path={PATH.LOGIN} component={LoginPage} />
          <Route path={PATH.SIGNUP} component={SignupPage} />
          <Route path={PATH.STATIONS} component={StationPage} />
          <Route path={PATH.LINES} component={LinePage} />
          <Route path={PATH.SECTIONS} component={SectionPage} />
        </Switch>
      </Main>
    </Router>
  );
};

export default App;
