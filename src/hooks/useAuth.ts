import { useAppDispatch, useAppSelector } from ".";
import { LoginInfo, SignupInfo } from "../@types/types";
import { action } from "../modules/auth";

const useAuth = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

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

  return { isAuthenticated, checkAccessToken, login, logout, signup };
};

export default useAuth;
