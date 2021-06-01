import React from "react";
import PropTypes from "prop-types";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../@shared/Input/hooks";
import { addLine } from "../../pages/Lines/slice";
import { selectStationsList } from "../../pages/Stations/slice";
import FloatingLabelInput from "../@shared/FloatingLabelInput";
import ColorSelect from "../ColorSelect";
import Select from "../@shared/Select";
import Button from "../@shared/Button";
import { useDistanceInput, useLineNameInput } from "./hooks";

const LinesModalInner = ({ onClose }) => {
  const dispatch = useDispatch();
  const stationList = useSelector(selectStationsList);

  const [lineName, handleLineNameChange, isValidLineName] = useLineNameInput();
  const [upStationId, handleUpStationIdChange] = useInput();
  const [downStationId, handleDownStationIdChange] = useInput();
  const [distance, handleDistanceChange, isValidDistance] = useDistanceInput();
  const [color, handleColorChange] = useInput();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await dispatch(
        addLine({
          lineName,
          color,
          upStationId,
          downStationId,
          distance,
        })
      );
      await unwrapResult(result);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitEnabled = [
    isValidLineName,
    upStationId !== "",
    downStationId !== "",
    upStationId !== downStationId,
    isValidDistance,
    color !== "",
  ].every(Boolean);

  return (
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
  );
};

LinesModalInner.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LinesModalInner;
