import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Main from './components/shared/Main/Main';
import PATH from './constants/path';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import TextLogo from './assets/images/ww-subway-logo-text.svg';

const App = () => {
  return (
    <Router>
      <Header backgroundColor="#0dd273">
        <Link to={PATH.ROOT}>
          <img src={TextLogo} />
        </Link>
        <NavBar>
          <Link to={PATH.STATIONS}>역관리</Link>
          <Link to={PATH.LINES}>노선관리</Link>
          <Link to={PATH.SECTIONS}>구간관리</Link>
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
    </Router>
  );
};

export default App;
