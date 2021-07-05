import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PATH from "../../constants/path";
import STATUS from "../../constants/status";
import { reset, selectSignupMessage, selectSignupStatus } from "./slice";
import Loading from "../../components/@shared/Loading";
import Alert from "../../components/@shared/Alert";
import SignupMain from "../../components/SignupMain";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const status = useSelector(selectSignupStatus);
  const message = useSelector(selectSignupMessage);

  const handleAlertConfirm = () => {
    dispatch(reset());

    if (status === STATUS.SUCCEED) {
      history.push(PATH.LOGIN);
    }
  };

  return (
    <>
      <Alert onConfirm={handleAlertConfirm} message={message} />
      <Loading isLoading={status === STATUS.LOADING} />
      <SignupMain />
    </>
  );
};

export default Signup;
