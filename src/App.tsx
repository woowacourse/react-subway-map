import Navigation from './components/@commons/Navigation/Navigation';
import GlobalStyles from './Global.styles';
import * as S from './App.styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ROUTE } from './constants/constant';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Station from './pages/Station/Station';
import Line from './pages/Line/Line';
import Section from './pages/Section/Section';
import Theme from './Theme';

const App = () => {
  return (
    <>
      <Theme>
        <GlobalStyles />
        <S.App>
          <BrowserRouter>
            <Navigation />
            <S.Container>
              <Switch>
                <Route exact path={ROUTE.SIGN_IN} component={SignIn} />
                <Route exact path={ROUTE.SIGN_UP} component={SignUp} />
                <Route exact path={ROUTE.STATION} component={Station} />
                <Route exact path={ROUTE.LINE} component={Line} />
                <Route exact path={ROUTE.SECTION} component={Section} />
              </Switch>
            </S.Container>
          </BrowserRouter>
        </S.App>
      </Theme>
    </>
  );
};

export default App;
