import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/@shared/Loading";
import Main from "../../components/@shared/Main";
import OverviewLineList from "../../components/OverviewLineList";
import STATUS from "../../constants/status";
import {
  fetchLinesDetail,
  selectLinesStatus,
  selectLinesMessage,
  selectLinesDetails,
  reset,
} from "../Lines/slice";

const Overview = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLinesStatus);
  const message = useSelector(selectLinesMessage);
  const overview = useSelector(selectLinesDetails);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchLinesDetail());
    }
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
      <Loading isLoading={false} />
      <Main>
        <section className="flex flex-col flex-wrap pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm overflow-x-auto">
          <h2 className="text-start mb-4 mt-6 p-4 text-gray-700 text-2xl font-medium">
            전체 보기
          </h2>
          <div className="flex flex-col">
            {overview && <OverviewLineList overview={overview} />}
          </div>
        </section>
      </Main>
    </>
  );
};
export default Overview;
