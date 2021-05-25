import { VFC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useLogin from '../../hooks/useLogin';

const PrivateRoute: VFC<RouteProps> = ({ ...args }) => {
  const { accessToken } = useLogin();

  return accessToken ? <Route {...args} /> : <Redirect to="/" />;
};

export default PrivateRoute;
