import React from "react";
import PropTypes from "prop-types";
import { Route, useHistory } from "react-router-dom";
import { useAuth } from "../../../pages/Login/hooks";
import PATH from "../../../constants/path";
import Alert from "../Alert";

const PrivateRoute = ({ children, ...rest }) => {
  const history = useHistory();
  const isAuthenticated = useAuth();

  const handleConfirm = () => {
    history.push(PATH.LOGIN);
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Alert message="로그인이 필요합니다." onConfirm={handleConfirm} />
      )}
    </Route>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
