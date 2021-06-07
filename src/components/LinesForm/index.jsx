import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useInput } from "../@shared/Input/hooks";
import { addLine } from "../../pages/Lines/slice";
import { selectStationsList } from "../../pages/Stations/slice";
import FloatingLabelInput from "../@shared/FloatingLabelInput";
import Button from "../@shared/Button";
import ColorSelect from "../ColorSelect";
import ListSelect from "../ListSelect";
import { useDistanceInput, useLineNameInput } from "./hooks";

const LinesForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const stationsList = useSelector(selectStationsList);

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
      closeModal();
    } catch (error) {
      /* do nothing when error occured */
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
        <ListSelect
          value={upStationId}
          onChange={handleUpStationIdChange}
          placeholder="상행종점"
          list={stationsList}
        />
        <span className="mx-6 text-gray-400 text-3xl">⬌</span>
        <ListSelect
          value={downStationId}
          onChange={handleDownStationIdChange}
          placeholder="하행종점"
          list={stationsList}
        />
      </div>

      <FloatingLabelInput
        id="line-distance"
        type="text"
        label="거리"
        value={distance}
        onChange={handleDistanceChange}
        isValid={isValidDistance}
      />

      <ColorSelect value={color} onChange={handleColorChange} />

      <Button type="submit" size="full" disabled={!isSubmitEnabled}>
        생성
      </Button>
    </form>
  );
};

LinesForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default LinesForm;
