import React from "react";
import { PropTypes } from "prop-types";
import cx from "classnames";

const getLineColor = (lineColor) => {
  const colorAttributes = lineColor.split(" ");
  const bgColor = colorAttributes[0];
  const formattedLineColor = bgColor.slice(3, bgColor.length);

  return formattedLineColor;
};

const getDistance = (line, stationName) =>
  line.sections.map(
    (section) =>
      section.upStation.name === stationName && (
        <span
          key={section.upStation.name}
          className="absolute -mt-6 ml-12 text-gray-400 text-xs"
        >
          {`${section.distance}km`}
        </span>
      )
  );

const OverviewSectionList = ({ line }) =>
  line.stations.map((station) => (
    <li
      key={station.name}
      className={cx(
        "relative flex flex-col items-center mt-2 pt-2 w-24 h-1 shadow-lg",
        line.color
      )}
    >
      <div
        className={cx(
          "absolute -my-3 mx-0.5 w-4 h-4 bg-white border-2 rounded-full shadow-lg",
          `border-${getLineColor(line.color)}`
        )}
      />
      <span className="mt-1 text-gray-600">{station.name}</span>
      {getDistance(line, station.name)}
    </li>
  ));

OverviewSectionList.propTypes = {
  line: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OverviewSectionList;
