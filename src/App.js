import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { NavBar, ServerSelector } from './components/';
import { ROUTE } from './constants';
import {
  Home,
  SignIn,
  SignUp,
  StationManager,
  LineManager,
  SectionManager,
} from './pages';
import { Flex } from './styles';

const Main = styled.main`
  ${Flex({ justify: 'center', items: 'center' })}
  height: calc(100% - 64px);
`;

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Main>
          <Switch>
            <Route exact path={ROUTE.HOME.PATH}>
              <Home />
            </Route>
            <Route exact path={ROUTE.SIGN_IN.PATH}>
              <SignIn />
            </Route>
            <Route exact path={ROUTE.SIGN_UP.PATH}>
              <SignUp />
            </Route>
            <Route exact path={ROUTE.STATION_MANAGE.PATH}>
              <StationManager />
            </Route>
            <Route exact path={ROUTE.LINE_MANAGE.PATH}>
              <LineManager />
            </Route>
            <Route exact path={ROUTE.SECTION_MANAGE.PATH}>
              <SectionManager />
            </Route>
          </Switch>
        </Main>
      </Router>
      <ServerSelector />
    </>
  );
}

export default App;
