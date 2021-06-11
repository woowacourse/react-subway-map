import { useSelector } from "react-redux";
import useStatus from "../../hooks/useStatus";
import { fetchOverview, reset, selectOverviewStatus } from "./slice";

export const useOverviewStatus = () => {
  const status = useSelector(selectOverviewStatus);

  return useStatus({ status, fetch: fetchOverview, reset });
};
