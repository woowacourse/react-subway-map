import { useSelector } from "react-redux";
import STATUS from "../../constants/status";
import { selectAccessToken, selectLoginStatus } from "./slice";

export const useAuth = () => {
  const accessToken = useSelector(selectAccessToken);
  const loginStatus = useSelector(selectLoginStatus);

  return accessToken !== null && loginStatus === STATUS.IDLE;
};
