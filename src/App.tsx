import { useContext, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';

import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Main from './components/shared/Main/Main';
import PATH from './constants/path';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import { ReactComponent as TextLogo } from './assets/images/ww-subway-logo-text.svg';
import { SnackBarContext } from './components/SnackBarProvider/SnackBarProvider';

interface a {
  [key: string]: (message: string) => void;
}

const App = () => {
  const { addMessage }: a = useContext(SnackBarContext);

  return (
    <Router>
      <Header backgroundColor="#0dd273" color="#ffffff">
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
          <Route path={PATH.STATIONS}>STATIONS</Route>
          <Route path={PATH.LINES}>LINES</Route>
          <Route path={PATH.SECTIONS}>SECTIONS</Route>
        </Switch>
      </Main>
      <button
        type="button"
        onClick={() => {
          addMessage(`스낵바`);
        }}
      >
        스낵바입니다
      </button>
    </Router>
  );
};

export default App;
