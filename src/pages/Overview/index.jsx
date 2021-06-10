import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/@shared/Loading";
import Main from "../../components/@shared/Main";
import STATUS from "../../constants/status";
import OverviewList from "../../components/OverviewList";
import {
  reset,
  fetchOverview,
  selectOverviewMessage,
  selectOverviewStatus,
  selectOverviewList,
} from "./slice";

const Overview = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectOverviewStatus);
  const message = useSelector(selectOverviewMessage);
  const list = useSelector(selectOverviewList);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchOverview());
    }

    return () => dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === STATUS.SUCCEED) {
      dispatch(reset());
    }

    if (status === STATUS.FAILED) {
      alert(message);
      dispatch(reset());
    }
  }, [status, message, dispatch]);

  return (
    <>
      <Loading isLoading={status === STATUS.LOADING} bgOpacity="10" />
      <Main>
        <section className="pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
            전체 보기
          </h2>
          <OverviewList list={list} />
        </section>
      </Main>
    </>
  );
};

export default Overview;
