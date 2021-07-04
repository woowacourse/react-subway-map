import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchOnce from "../../hooks/useFetchOnce";
import STATUS from "../../constants/status";
import {
  fetchStations,
  reset,
  selectStationsMessage,
  selectStationsStatus,
} from "./slice";
import Loading from "../../components/@shared/Loading";
import Alert from "../../components/@shared/Alert";
import StationsMain from "../../components/StationsMain";

const Stations = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStationsStatus);
  const message = useSelector(selectStationsMessage);

  useFetchOnce({ fetch: fetchStations, reset });

  const handleAlertConfirm = () => dispatch(reset());

  return (
    <>
      <Alert isOpen={Boolean(message)} onConfirm={handleAlertConfirm}>
        <p className="text-lg">{message}</p>
      </Alert>
      <Loading isLoading={status === STATUS.LOADING} />

      <StationsMain />
    </>
  );
};

export default Stations;
