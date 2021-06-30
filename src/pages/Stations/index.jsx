import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useStationsStatus } from "./hooks";
import STATUS from "../../constants/status";
import { selectStationsList, selectStationsMessage } from "./slice";
import Main from "../../components/@shared/Main";
import Loading from "../../components/@shared/Loading";
import StationsForm from "../../components/StationsForm";
import StationsList from "../../components/StationsList";

const Stations = () => {
  const status = useStationsStatus();
  const message = useSelector(selectStationsMessage);
  const list = useSelector(selectStationsList);

  useEffect(() => {
    if (status === STATUS.FAILED) {
      alert(message);
    }
  }, [status, message]);

  return (
    <Main className="relative">
      <Loading isLoading={status === STATUS.LOADING} />
      <section className="relative pb-8 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
        <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
          지하철 역 관리
        </h2>
        <StationsForm />
      </section>
      <StationsList list={list} />
    </Main>
  );
};

export default Stations;
