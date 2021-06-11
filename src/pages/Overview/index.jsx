import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/@shared/Loading";
import Main from "../../components/@shared/Main";
import STATUS from "../../constants/status";
import OverviewList from "../../components/OverviewList";
import { selectOverviewMessage, selectOverviewList } from "./slice";
import { useOverviewStatus } from "./hooks";

const Overview = () => {
  const status = useOverviewStatus();
  const message = useSelector(selectOverviewMessage);
  const list = useSelector(selectOverviewList);

  useEffect(() => {
    if (status === STATUS.FAILED) {
      alert(message);
    }
  }, [status, message]);

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
