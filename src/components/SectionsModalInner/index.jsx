import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import FloatingLabelInput from "../@shared/FloatingLabelInput";
import { useInput } from "../@shared/Input/hooks";
import { useDistanceInput } from "../LinesModalInner/hooks";
import {
  addSection,
  fetchLinesDetail,
  selectLinesDetailByLineId,
} from "../../pages/Lines/slice";
import SectionsLineSelect from "../SectionsLineSelect";
import SectionsStationSelect from "../SectionsStationSelect";
import Button from "../@shared/Button";

const SectionsModalInner = ({ lineId, onClose }) => {
  const dispatch = useDispatch();
  const lineDetail = useSelector((state) =>
    selectLinesDetailByLineId(state, lineId)
  );

  const [upStationId, handleUpStationIdChange] = useInput();
  const [downStationId, handleDownStationIdChange] = useInput();
  const [distance, handleDistanceChange, isValidDistance] = useDistanceInput();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(
        addSection({ lineId, upStationId, downStationId, distance })
      );
      await dispatch(fetchLinesDetail());
      await unwrapResult(result);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitEnabled = [
    upStationId !== "",
    downStationId !== "",
    [upStationId, downStationId].filter((id) =>
      lineDetail?.stations.map((station) => station.id).includes(Number(id))
    ).length === 1,
    upStationId !== downStationId,
    isValidDistance,
  ].every(Boolean);

  return (
    <form
      className="flex flex-col items-center px-4 py-12 w-144 bg-white rounded-lg shadow-2xl"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 pb-6 text-center text-2xl">구간 추가</h2>
      <SectionsLineSelect disabled />
      <div className="flex mx-4 my-10 w-full">
        <SectionsStationSelect
          optionValue="상행역"
          onChange={handleUpStationIdChange}
          value={upStationId}
        />
        <span className="mx-6 text-gray-400 text-3xl">⬌</span>
        <SectionsStationSelect
          optionValue="하행역"
          onChange={handleDownStationIdChange}
          value={downStationId}
        />
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
          onClick={onClose}
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
  );
};

SectionsModalInner.propTypes = {
  onClose: PropTypes.func.isRequired,
  lineId: PropTypes.string.isRequired,
};

export default SectionsModalInner;
