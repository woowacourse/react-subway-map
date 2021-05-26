import React from "react";
import { useDispatch, useSelector } from "react-redux";
import STATUS from "../../constants/status";
import Main from "../../components/@shared/Main";
import Button from "../../components/@shared/Button";
import FloatingLabelInput from "../../components/@shared/FloatingLabelInput";
import Loading from "../../components/@shared/Loading";
import { useStationName } from "./hooks";
import {
  addStation,
  selectStationsStatus,
  selectStationsMessage,
} from "./slice";

const Stations = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStationsStatus);
  const message = useSelector(selectStationsMessage);
  const [stationName, handleStationNameChange, isStationNameValid] =
    useStationName();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addStation(stationName));
  };

  if (status === STATUS.FAILED) {
    // TODO: alert로 유저에게 보여주기
    console.log(message);
  }

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
        <section className="mt-8 pb-8 pl-8 pr-6 py-4 w-144 rounded-sm shadow-md">
          <ul className="space-y-8">
            <li className="flex justify-between p-2 text-gray-600 text-xl">
              <span>강남역</span>
              <button
                type="button"
                className="focus:text-black focus:outline-none focus:opacity-100 opacity-60"
              >
                🗑
              </button>
            </li>
            <li className="flex justify-between p-2 text-gray-600 text-xl">
              <span>동탄역</span>
              <button
                type="button"
                className="focus:text-black focus:outline-none focus:opacity-100 opacity-60"
              >
                🗑
              </button>
            </li>
          </ul>
        </section>
      </Main>
    </>
  );
};

export default Stations;
