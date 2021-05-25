import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import PATH from "../../constants/path";
import { logout } from "../Login/slice";

const Logout = () => {
  const dispatch = useDispatch();

  dispatch(logout());

  return <Redirect to={PATH.LOGIN} />;
};

export default Logout;
