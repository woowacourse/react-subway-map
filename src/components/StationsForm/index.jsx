import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { addStation } from "../../pages/Stations/slice";
import Button from "../@shared/Button";
import FloatingLabelInput from "../@shared/FloatingLabelInput";
import { useStationName } from "./hooks";

const StationsForm = () => {
  const dispatch = useDispatch();

  const [
    stationName,
    handleStationNameChange,
    isStationNameValid,
    resetStationName,
  ] = useStationName();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addStation(stationName))
      .then(unwrapResult)
      .then(() => {
        resetStationName();
      })
      .catch(() => {
        /* do nothing when error occured */
      });
  };

  return (
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
  );
};

export default StationsForm;
