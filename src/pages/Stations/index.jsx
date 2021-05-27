import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import STATUS from "../../constants/status";
import Main from "../../components/@shared/Main";
import Button from "../../components/@shared/Button";
import FloatingLabelInput from "../../components/@shared/FloatingLabelInput";
import Loading from "../../components/@shared/Loading";
import { useStationName } from "./hooks";
import {
  selectStationsStatus,
  selectStationsMessage,
  selectStationsList,
  addStation,
  fetchStations,
  deleteStationById,
  reset,
} from "./slice";

const Stations = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStationsStatus);
  const message = useSelector(selectStationsMessage);
  const list = useSelector(selectStationsList);
  const [
    stationName,
    handleStationNameChange,
    isStationNameValid,
    resetStationName,
  ] = useStationName();

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchStations());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === STATUS.SUCCEED) {
      dispatch(reset());
      resetStationName();
    }

    if (status === STATUS.FAILED) {
      alert(message);
      dispatch(reset());
    }
  }, [dispatch, status, message, resetStationName]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addStation(stationName));
  };

  const handleDelete = (event) => {
    const { name: id, value } = event.target;

    if (window.confirm(`${value}를 삭제하시겠습니까?`)) {
      dispatch(deleteStationById(id));
    }
  };

  return (
    <>
      <Loading isLoading={status === STATUS.LOADING} bgOpacity="10" />
      <Main>
        <section className="pb-8 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
            지하철 역 관리
          </h2>
          <form className="flex px-8 w-full space-x-4" onSubmit={handleSubmit}>
            <FloatingLabelInput
              id="station-name"
              type="text"
              label="지하철 역 이름을 입력해주세요."
              value={stationName}
              onChange={handleStationNameChange}
              isValid={isStationNameValid}
            />
            <Button type="submit" size="medium" disabled={!isStationNameValid}>
              추가
            </Button>
          </form>
        </section>
        {list.length > 0 && (
          <section className="mt-8 pb-8 pl-8 pr-6 py-4 w-144 rounded-sm shadow-md">
            <ul className="space-y-8">
              {[...list].reverse().map(({ id, name }) => (
                <li
                  key={id}
                  className="flex justify-between p-2 text-gray-600 text-xl"
                >
                  <span>{name}</span>
                  <button
                    type="button"
                    className="focus:text-black focus:outline-none focus:opacity-100 opacity-60"
                    name={id}
                    value={name}
                    onClick={handleDelete}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Main>
    </>
  );
};

export default Stations;
