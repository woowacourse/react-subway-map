import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';

import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Main from './components/shared/Main/Main';
import PATH from './constants/path';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import StationPage from './pages/StationPage/StationPage';
import { ReactComponent as TextLogo } from './assets/images/ww-subway-logo-text.svg';
import PALETTE from './constants/palette';
import { ThemeContext } from './contexts/ThemeContextProvider';

const App = () => {
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;

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
          <NavLink to={PATH.LOGIN}>전체보기</NavLink>
          <NavLink to={PATH.LOGIN}>로그인</NavLink>
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
          <Route path={PATH.LINES}>LINES</Route>
          <Route path={PATH.SECTIONS}>SECTIONS</Route>
        </Switch>
      </Main>
    </Router>
  );
};

export default App;
