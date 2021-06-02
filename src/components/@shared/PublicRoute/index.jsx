import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import PATH from "../../../constants/path";
import { useAuth } from "../../../pages/Login/hooks";

const PublicRoute = ({ children, redirectTo, ...rest }) => {
  const isAuthenticated = useAuth();

  return (
    <Route {...rest}>
      {isAuthenticated ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.oneOf(Object.values(PATH)),
};

PublicRoute.defaultProps = {
  redirectTo: PATH.STATIONS,
};

export default PublicRoute;
