import { VFC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useLogin from '../../hooks/useLogin';

const PrivateRoute: VFC<RouteProps> = ({ ...args }) => {
  const { isLogin } = useLogin();

  return isLogin ? <Route {...args} /> : <Redirect to="/" />;
};

export default PrivateRoute;
