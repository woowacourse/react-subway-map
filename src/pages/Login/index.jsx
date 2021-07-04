import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PATH from "../../constants/path";
import STATUS from "../../constants/status";
import { reset, selectLoginMessage, selectLoginStatus } from "./slice";
import Loading from "../../components/@shared/Loading";
import LoginMain from "../../components/LoginMain";

import Alert from "../../components/@shared/Alert";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const status = useSelector(selectLoginStatus);
  const message = useSelector(selectLoginMessage);

  const handleAlertConfirm = () => {
    dispatch(reset());

    if (status === STATUS.SUCCEED) {
      history.push(PATH.STATIONS);
    }
  };

  return (
    <>
      <Alert onConfirm={handleAlertConfirm} message={message} />
      <Loading isLoading={status === STATUS.LOADING} />
      <LoginMain />
    </>
  );
};

export default Login;
