import { useSelector } from "react-redux";
import STATUS from "../../constants/status";
import { selectAccessToken } from "./slice";

export const useAuth = () => {
  const accessToken = useSelector(selectAccessToken);
  const loginStatus = useSelector((state) => state.login.status);

  return accessToken !== null && loginStatus === STATUS.IDLE;
};
