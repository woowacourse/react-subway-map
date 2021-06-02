import React from "react";
import { PropTypes } from "prop-types";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteSection,
  fetchLinesDetail,
  selectLinesDetailByLineId,
} from "../../pages/Lines/slice";
import Button from "../@shared/Button";

const SectionsStationList = ({ lineId }) => {
  const dispatch = useDispatch();
  const lineDetail = useSelector((state) =>
    selectLinesDetailByLineId(state, lineId)
  );

  const handleDeleteClick = async (event) => {
    const { name: stationName, value: stationId } = event.target;

    if (window.confirm(`${stationName}를 삭제하시겠습니까?`)) {
      await dispatch(deleteSection({ lineId, stationId }));
      await dispatch(fetchLinesDetail());
    }
  };

  return lineDetail ? (
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
  ) : (
    <> </>
  );
};

SectionsStationList.propTypes = {
  lineId: PropTypes.string.isRequired,
};

export default SectionsStationList;
