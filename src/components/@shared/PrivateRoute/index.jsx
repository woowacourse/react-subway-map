import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../../pages/Login/hooks";
import PATH from "../../../constants/path";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    alert("로그인이 필요합니다.");
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...rest}>
      {isAuthenticated ? children : <Redirect to={PATH.LOGIN} />}
    </Route>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
