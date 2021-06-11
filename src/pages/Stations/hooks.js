import { useSelector } from "react-redux";
import useStatus from "../../hooks/useStatus";
import { fetchStations, reset, selectStationsStatus } from "./slice";

export const useStationsStatus = () => {
  const status = useSelector(selectStationsStatus);

  return useStatus({ status, fetch: fetchStations, reset });
};
