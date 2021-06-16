import { Route, RouteProps, Redirect } from "react-router";

import { PAGE_PATH } from "./constants";

import { FormProvider } from "./components";
import { RouteShape } from "./@types/route";

interface Props {
  routes: RouteShape[];
  isAuthenticated: boolean;
}

const Routes = ({ routes, isAuthenticated }: Props) => {
  const PublicRoute = ({ children, ...props }: RouteProps) => (
    <Route {...props}>
      {isAuthenticated ? <Redirect to={PAGE_PATH.HOME} /> : children};
    </Route>
  );

  const PrivateRoute = ({ children, ...props }: RouteProps) => (
    <Route {...props}>
      {isAuthenticated ? children : <Redirect to={PAGE_PATH.LOGIN} />}
    </Route>
  );

  return (
    <>
      {routes.map(({ isPrivate, path, Component }, index) => {
        const TargetRoute = isPrivate ? PrivateRoute : PublicRoute;

        return (
          <TargetRoute key={index} exact path={path}>
            <FormProvider>
              <Component />
            </FormProvider>
          </TargetRoute>
        );
      })}
    </>
  );
};

export default Routes;
