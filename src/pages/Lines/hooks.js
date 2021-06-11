import { useSelector } from "react-redux";
import useStatus from "../../hooks/useStatus";
import { fetchLines, reset, selectLinesStatus } from "./slice";

export const useLinesStatus = () => {
  const status = useSelector(selectLinesStatus);

  return useStatus({ status, fetch: fetchLines, reset });
};
