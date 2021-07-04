import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTE } from '../../../constants';
import ConditionalRoute from '../../atoms/ConditionalRoute/ConditionalRoute';
import { Home, Line, Login, Logout, Section, SignUp, Station } from '../../pages';

const RouteInfoList = [
  {
    isPrivate: true,
    component: Station,
    path: ROUTE.STATION,
  },
  {
    isPrivate: true,
    component: Line,
    path: ROUTE.LINE,
  },
  {
    isPrivate: true,
    component: Section,
    path: ROUTE.SECTION,
  },
  {
    isPrivate: true,
    component: Logout,
    path: ROUTE.LOGOUT,
  },
  {
    isPrivate: false,
    component: SignUp,
    path: ROUTE.SIGNUP,
  },
  {
    isPrivate: false,
    component: Login,
    path: ROUTE.LOGIN,
  },
];

interface RoutesProps {
  isAuthed: boolean;
}

const Routes = ({ isAuthed }: RoutesProps) => {
  return (
    <Switch>
      <Route exact path={ROUTE.HOME} component={Home} />
      {RouteInfoList.map(({ isPrivate, component, path }, idx) => {
        return isPrivate ? (
          <ConditionalRoute
            key={idx}
            condition={isAuthed}
            component={component}
            path={path}
            redirectPath={ROUTE.HOME}
          />
        ) : (
          <ConditionalRoute
            key={idx}
            condition={!isAuthed}
            component={component}
            path={path}
            redirectPath={ROUTE.HOME}
          />
        );
      })}
      <Redirect to={ROUTE.HOME} />
    </Switch>
  );
};

export default Routes;
