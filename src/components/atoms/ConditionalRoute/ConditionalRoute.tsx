import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ConditionalRouteProps extends RouteProps {
  condition: boolean;
  redirectPath: string;
}

const ConditionalRoute = ({
  condition,
  component,
  exact = true,
  path,
  redirectPath,
}: ConditionalRouteProps) => {
  return (
    <>
      {condition ? (
        <Route exact={exact} path={path} component={component} />
      ) : (
        <Redirect to={redirectPath} />
      )}
    </>
  );
};

export default ConditionalRoute;
