import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import STATUS from "../../constants/status";
import { useModal } from "../../components/@shared/Modal/hooks";
import { useInput } from "../../components/@shared/Input/hooks";
import Main from "../../components/@shared/Main";
import Modal from "../../components/@shared/Modal";
import Select from "../../components/@shared/Select";
import Button from "../../components/@shared/Button";
import FloatingLabelInput from "../../components/@shared/FloatingLabelInput";
import { useDistanceInput } from "../Lines/hooks";
import {
  fetchLines,
  fetchLinesDetail,
  selectLinesDetailByLineId,
  selectLinesList,
  selectLinesStatus,
} from "../Lines/slice";
import { selectStationsList } from "../Stations/slice";

const Sections = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLinesStatus);
  const linesList = useSelector(selectLinesList);
  const stationList = useSelector(selectStationsList);
  const [lineId, handleLineIdChange] = useInput();
  const [isModalOpen, handleModalOpen, handleModalClose] = useModal(false);
  const [upStationId, handleUpStationIdChange] = useInput();
  const [downStationId, handleDownStationIdChange] = useInput();
  const [distance, handleDistanceChange, isValidDistance] = useDistanceInput();
  const lineDetail = useSelector((state) =>
    selectLinesDetailByLineId(state, lineId)
  );
  // const modalLineDetail = useSelector((state) =>
  //   selectLinesDetailByLineId(state, modalLineId)
  // );

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchLines());
      dispatch(fetchLinesDetail());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: dispatch post Section!!!
  };

  const isSubmitEnabled = [
    lineId !== "",
    upStationId !== "",
    downStationId !== "",
    [upStationId, downStationId].filter((id) =>
      lineDetail?.stations.map((station) => station.id).includes(Number(id))
    ).length === 1,
    upStationId !== downStationId,
    isValidDistance,
  ].every(Boolean);

  return (
    <>
      <Main>
        <section className="pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
            구간 관리
          </h2>
          <Select onChange={handleLineIdChange} value={lineId}>
            <option hidden>노선 선택</option>
            {linesList.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
          <div className="relative">
            <hr className="-mx-4 my-12" />
            <button
              type="button"
              className={cx(
                "absolute -top-7 right-0 w-14 h-14 text-3xl rounded-full focus:outline-none shadow-md",
                lineId ? "bg-yellow-300 hover:bg-yellow-400 " : "bg-gray-300"
              )}
              onClick={handleModalOpen}
              aria-label="add-button"
              disabled={!lineId}
            >
              +
            </button>
          </div>
          {lineDetail && (
            <div className="border rounded-md">
              <h3
                className={cx(
                  "pl-4 py-2 text-gray-800 text-xl rounded-t-md",
                  lineDetail.color
                )}
              >
                {lineDetail.name}
              </h3>
              <ul className="py-2 text-gray-600">
                {lineDetail.stations.map(({ id, name }) => (
                  <li key={id} className="flex justify-between px-8 py-4">
                    <span>{name}</span>
                    <button
                      type="button"
                      className="focus:text-black focus:outline-none focus:opacity-100 opacity-60"
                    >
                      🗑
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </Main>

      <Modal isOpen={isModalOpen} close={handleModalClose}>
        <form
          className="flex flex-col items-center px-4 py-12 w-144 bg-white rounded-lg shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 pb-6 text-center text-2xl">구간 추가</h2>

          <Select value={lineId} onChange={handleLineIdChange} disabled>
            <option hidden>노선 선택</option>
            {linesList.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>

          <div className="flex mx-4 my-10 w-full">
            <Select value={upStationId} onChange={handleUpStationIdChange}>
              <option hidden>상행역</option>
              {stationList.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
            <span className="mx-6 text-gray-400 text-3xl">⬌</span>
            <Select value={downStationId} onChange={handleDownStationIdChange}>
              <option hidden>하행역</option>
              {stationList.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </div>

          <FloatingLabelInput
            type="number"
            id="line-distance"
            label="거리"
            value={distance}
            onChange={handleDistanceChange}
            isValid={isValidDistance}
          />

          <div className="flex justify-end mr-4 mt-14 w-full space-x-4">
            <Button
              type="button"
              size="medium"
              theme="secondary"
              onClick={handleModalClose}
            >
              취소
            </Button>
            <Button type="submit" size="medium" disabled={!isSubmitEnabled}>
              확인
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Sections;
