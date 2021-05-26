import { VFC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

interface Props extends RouteProps {
  isAuthenticated: boolean;
  redirectTo: string;
}

const PrivateRoute: VFC<Props> = ({ isAuthenticated, redirectTo, ...args }) => {
  return isAuthenticated ? <Route {...args} /> : <Redirect to={redirectTo} />;
};

export default PrivateRoute;
