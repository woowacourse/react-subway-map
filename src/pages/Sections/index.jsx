import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import cx from "classnames";
import STATUS from "../../constants/status";
import { useToggle } from "../../components/@shared/hooks";

import { useInput } from "../../components/@shared/Input/hooks";
import Main from "../../components/@shared/Main";
import Modal from "../../components/@shared/Modal";
import Select from "../../components/@shared/Select";
import Button from "../../components/@shared/Button";
import Loading from "../../components/@shared/Loading";
import FloatingLabelInput from "../../components/@shared/FloatingLabelInput";
import { useDistanceInput } from "../../components/LinesModalInner/hooks";
import {
  addSection,
  fetchLines,
  fetchLinesDetail,
  reset,
  deleteSection,
  selectLinesDetailByLineId,
  selectLineList,
  selectLinesStatus,
  selectLinesMessage,
} from "../Lines/slice";
import { selectStationList } from "../Stations/slice";

const Sections = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLinesStatus);
  const message = useSelector(selectLinesMessage);
  const lineList = useSelector(selectLineList);
  const stationList = useSelector(selectStationList);
  const [isModalOpen, handleModalOpen, handleModalClose] = useToggle(false);
  const [lineId, handleLineIdChange] = useInput();
  const [upStationId, handleUpStationIdChange, , resetUpStationId] = useInput();
  const [downStationId, handleDownStationIdChange, , resetDownStationId] =
    useInput();
  const [distance, handleDistanceChange, isValidDistance, resetDistance] =
    useDistanceInput();
  const lineDetail = useSelector((state) =>
    selectLinesDetailByLineId(state, lineId)
  );

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchLines())
        .then(unwrapResult)
        .then((list) => {
          if (!list || list.length === 0) return;

          handleLineIdChange({
            target: { value: list[list.length - 1].id.toString() },
          });
        });

      dispatch(fetchLinesDetail());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const resetInput = () => {
      resetUpStationId();
      resetDownStationId();
      resetDistance();
    };

    if (status === STATUS.SUCCEED) {
      if (message) {
        alert(message);
      }

      handleModalClose();
      dispatch(reset());
      resetInput();
    }

    if (status === STATUS.FAILED) {
      alert(message);
      dispatch(reset());
    }
  }, [
    message,
    status,
    dispatch,
    handleModalClose,
    resetDistance,
    resetDownStationId,
    resetUpStationId,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(
      addSection({ lineId, upStationId, downStationId, distance })
    );
    await dispatch(fetchLinesDetail());
  };

  const handleDeleteClick = async (event) => {
    const { name: stationName, value: stationId } = event.target;

    if (window.confirm(`${stationName}를 삭제하시겠습니까?`)) {
      await dispatch(deleteSection({ lineId, stationId }));
      await dispatch(fetchLinesDetail());
    }
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
      <Loading isLoading={status === STATUS.LOADING} bgOpacity="10" />
      <Main>
        <section className="pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
            구간 관리
          </h2>
          <Select onChange={handleLineIdChange} value={lineId}>
            <option hidden>노선 선택</option>
            {[...lineList].reverse().map(({ id, name }) => (
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
                    <Button
                      type="button"
                      disabled={false}
                      size="auto"
                      theme="icon"
                      onClick={handleDeleteClick}
                      name={name}
                      value={id}
                    >
                      🗑
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </Main>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <form
          className="flex flex-col items-center px-4 py-12 w-144 bg-white rounded-lg shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 pb-6 text-center text-2xl">구간 추가</h2>

          <Select value={lineId} onChange={handleLineIdChange} disabled>
            <option hidden>노선 선택</option>
            {lineList.map(({ id, name }) => (
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
              disabled={false}
              size="medium"
              theme="secondary"
              onClick={handleModalClose}
              name={null}
              value={null}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={!isSubmitEnabled}
              size="medium"
              theme="primary"
              onClick={null}
              name={null}
              value={null}
            >
              확인
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Sections;
