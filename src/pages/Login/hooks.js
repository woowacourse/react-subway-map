import { useSelector } from "react-redux";
import { selectAccessToken } from "./slice";

export const useAuth = () => {
  const accessToken = useSelector(selectAccessToken);

  return accessToken !== null;
};
