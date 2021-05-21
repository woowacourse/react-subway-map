import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import Main from './components/shared/Main/Main';
import PATH from './constants/path';
import LoginPage from './pages/LoginPage/LoginPage';

const App = () => {
  return (
    <Router>
      <Main>
        <Switch>
          <Route exact path={PATH.ROOT}>
            ROOT
          </Route>
          <Route path={PATH.LOGIN} component={LoginPage} />
          <Route path={PATH.SIGNUP}>SIGNUP</Route>
          <Route path={PATH.STATIONS}>STATIONS</Route>
          <Route path={PATH.LINES}>LINES</Route>
          <Route path={PATH.SECTIONS}>SECTIONS</Route>
        </Switch>
      </Main>
    </Router>
  );
};

export default App;
