import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { NavBar } from './components/';
import { ROUTE } from './constants';
import { SignIn, SignUp, StationManager } from './pages';
import { Flex } from './styles';

const Main = styled.main`
  ${Flex({ justify: 'center', items: 'center' })}
  height: 100%;
`;

function App() {
  return (
    <Router>
      <NavBar />
      <Main>
        <Switch>
          <Route exact path={ROUTE.HOME.PATH}></Route>
          <Route exact path={ROUTE.SIGN_IN.PATH}>
            <SignIn />
          </Route>
          <Route exact path={ROUTE.SIGN_UP.PATH}>
            <SignUp />
          </Route>
          <Route exact path={ROUTE.STATION_MANAGE.PATH}>
            <StationManager />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
