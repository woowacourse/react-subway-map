import { Button, Menu, Main, RootContainer, Title } from './components/atoms';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Home, SignUp } from './components/pages';

import { ROUTE } from './constants';

const App = () => {
  return (
    <Router>
      <RootContainer>
        <Title>지하철 노선도</Title>
        <Main>
          <Switch>
            <Route exact path={ROUTE.HOME} component={Home} />
            <Route exact path={ROUTE.SIGNUP} component={SignUp} />
            <Route component={() => <Redirect to={ROUTE.HOME} />} />
          </Switch>
        </Main>
      </RootContainer>
    </Router>
  );
};

export default App;
