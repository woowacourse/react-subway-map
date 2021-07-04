import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchOnce from "../../hooks/useFetchOnce";
import STATUS from "../../constants/status";
import {
  selectOverviewMessage,
  fetchOverview,
  reset,
  selectOverviewStatus,
} from "./slice";
import Loading from "../../components/@shared/Loading";
import Alert from "../../components/@shared/Alert";
import OverviewMain from "../../components/OverviewMain";

const Overview = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectOverviewStatus);
  const message = useSelector(selectOverviewMessage);

  useFetchOnce({ fetch: fetchOverview, reset });

  const handleAlertConfirm = () => dispatch(reset());

  return (
    <>
      <Alert isOpen={Boolean(message)} onConfirm={handleAlertConfirm}>
        <p className="text-lg">{message}</p>
      </Alert>
      <Loading isLoading={status === STATUS.LOADING} />

      <OverviewMain />
    </>
  );
};

export default Overview;
