import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from ".";
import { LoginInfo, SignupInfo } from "../@types/types";
import { action } from "../modules/auth";

const useAuth = () => {
  const { isAuthenticated, error } = useAppSelector(({ auth: { isAuthenticated, error } }) => ({
    isAuthenticated,
    error,
  }));

  const dispatch = useAppDispatch();

  const checkAccessToken = async () => {
    await dispatch(action.checkAccessToken());
  };

  const login = async (loginInfo: LoginInfo) => {
    const loginResult = await dispatch(action.login(loginInfo));
    await unwrapResult(loginResult);
  };

  const signup = async (signupInfo: SignupInfo) => {
    const signupResult = await dispatch(action.signup(signupInfo));
    await unwrapResult(signupResult);
  };

  const logout = () => {
    dispatch(action.logout());
  };

  return { isAuthenticated, checkAccessToken, login, logout, signup, error };
};

export default useAuth;
