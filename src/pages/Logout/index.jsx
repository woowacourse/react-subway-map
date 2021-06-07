import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import PATH from "../../constants/path";
import { logout } from "../Login/slice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  });

  return <Redirect to={PATH.LOGIN} />;
};

export default Logout;
