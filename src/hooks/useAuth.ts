import { useAppDispatch, useAppSelector } from "./useRedux";

import { action } from "../modules/auth";

import { LoginInfo, SignupInfo } from "../@types/types";

const useAuth = () => {
  const { isAuthenticated, loading, error } = useAppSelector(
    ({ auth: { isAuthenticated, loading, error } }) => ({
      isAuthenticated,
      loading,
      error,
    })
  );

  const dispatch = useAppDispatch();

  const checkAccessToken = async () => {
    await dispatch(action.checkAccessToken());
  };

  const login = async (loginInfo: LoginInfo) => {
    await dispatch(action.login(loginInfo));
  };

  const signup = async (signupInfo: SignupInfo) => {
    await dispatch(action.signup(signupInfo));
  };

  const logout = () => {
    dispatch(action.logout());
  };

  return {
    isAuthenticated,
    loading,
    error,
    checkAccessToken,
    login,
    logout,
    signup,
  };
};

export default useAuth;
