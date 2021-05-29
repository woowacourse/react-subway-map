import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import STATUS from "../../constants/status";
import Main from "../../components/@shared/Main";
import Loading from "../../components/@shared/Loading";
import StationsForm from "../../components/StationsForm";
import StationsList from "../../components/StationsList";
import { fetchStations, reset } from "./slice";

const Stations = () => {
  const dispatch = useDispatch();
  const { status, message, list } = useSelector((state) => state.stations);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchStations());
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
        <section className="pb-8 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
            지하철 역 관리
          </h2>
          <StationsForm />
        </section>
        <StationsList list={list} />
      </Main>
    </>
  );
};

export default Stations;
