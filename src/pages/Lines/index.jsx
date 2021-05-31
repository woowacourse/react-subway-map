import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../components/@shared/Modal/hooks";
import Main from "../../components/@shared/Main";
import Modal from "../../components/@shared/Modal";
import Button from "../../components/@shared/Button";
import FloatingLabelInput from "../../components/@shared/FloatingLabelInput";
import Select from "../../components/@shared/Select";
import ColorSelect from "../../components/ColorSelect";
import LinesList from "../../components/LinesList";
import { useInput } from "../../components/@shared/Input/hooks";
import { selectStationsList } from "../Stations/slice";
import Loading from "../../components/@shared/Loading";
import STATUS from "../../constants/status";
import {
  addLine,
  fetchLines,
  reset,
  selectLinesStatus,
  selectLinesMessage,
  selectLinesList,
} from "./slice";
import { useDistanceInput, useLineNameInput } from "./hooks";

const Lines = () => {
  const dispatch = useDispatch();
  const [isModalOpen, handleModalOpen, handleModalClose] = useModal(false);
  const [lineName, handleLineNameChange, isValidLineName, resetLineName] =
    useLineNameInput();
  const [upStationId, handleUpStationIdChange, , resetUpStationId] = useInput();
  const [downStationId, handleDownStationIdChange, , resetDownStationId] =
    useInput();
  const [distance, handleDistanceChange, isValidDistance, resetDistance] =
    useDistanceInput();
  const [color, handleColorChange, , resetColor] = useInput();
  const stationList = useSelector(selectStationsList);
  const status = useSelector(selectLinesStatus);
  const message = useSelector(selectLinesMessage);
  const lineList = useSelector(selectLinesList);

  const isSubmitEnabled = [
    isValidLineName,
    upStationId !== "",
    downStationId !== "",
    upStationId !== downStationId,
    isValidDistance,
    color !== "",
  ].every(Boolean);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchLines());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const resetInput = () => {
      resetLineName();
      resetUpStationId();
      resetDownStationId();
      resetDistance();
      resetColor();
    };

    if (status === STATUS.SUCCEED) {
      dispatch(reset());
      handleModalClose();
      resetInput();
    }

    if (status === STATUS.FAILED) {
      alert(message);
      dispatch(reset());
    }
  }, [
    status,
    message,
    handleModalClose,
    dispatch,
    resetLineName,
    resetUpStationId,
    resetDownStationId,
    resetDistance,
    resetColor,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addLine({
        lineName,
        color,
        upStationId,
        downStationId,
        distance,
      })
    );
  };

  return (
    <>
      <Loading isLoading={status === STATUS.LOADING} bgOpacity="10" />
      <Main>
        <section className="pb-8 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <div className="flex items-center justify-between px-4">
            <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
              노선 관리
            </h2>
            <Button
              type="button"
              disabled={false}
              size="medium"
              theme="primary"
              onClick={handleModalOpen}
              name={null}
              value={null}
            >
              등록
            </Button>
          </div>
          <LinesList lineList={lineList} />
        </section>
      </Main>
      <Modal onClose={handleModalClose} isOpen={isModalOpen}>
        <form
          className="flex flex-col items-center px-4 py-12 w-144 bg-white rounded-lg shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 pb-6 text-center text-2xl">노선 생성</h2>

          <FloatingLabelInput
            type="text"
            id="line-name"
            label="노선이름"
            value={lineName}
            onChange={handleLineNameChange}
            isValid={isValidLineName}
          />

          <div className="flex mx-4 my-10 w-full">
            <Select value={upStationId} onChange={handleUpStationIdChange}>
              <option hidden>상행종점</option>
              {stationList.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
            <span className="mx-6 text-gray-400 text-3xl">⬌</span>
            <Select value={downStationId} onChange={handleDownStationIdChange}>
              <option hidden>하행종점</option>
              {stationList.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </div>

          <FloatingLabelInput
            value={distance}
            onChange={handleDistanceChange}
            isValid={isValidDistance}
            type="text"
            id="line-distance"
            label="거리"
          />

          <ColorSelect value={color} onChange={handleColorChange} />

          <Button
            type="submit"
            disabled={!isSubmitEnabled}
            size="full"
            theme="primary"
            onClick={null}
            name={null}
            value={null}
          >
            생성
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default Lines;
