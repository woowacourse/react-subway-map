import React from "react";
import PropTypes from "prop-types";
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

const getSectionsList = (line) => (
  <>
    {line.stations.map((station) => (
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
    ))}
  </>
);

const OverviewLineList = ({ overview }) => {
  const widthByLength = (lineName) => {
    if (lineName.length <= 3) {
      return "w-14";
    }

    if (lineName.length <= 4) {
      return "w-16";
    }
    return "";
  };

  return (
    <>
      {overview.map((line) => (
        <ul key={`${line.name}unique`} className="flex h-20">
          <div
            className={cx(
              "-mr-1 pl-3 pr-2 pt-1 h-6 text-center text-white text-xs rounded-xl shadow-lg",
              line.color,
              widthByLength(line.name)
            )}
          >
            {line.name}
          </div>
          {getSectionsList(line)}
          <div
            className={cx(
              "-ml-1 pl-3 pr-2 pt-1 h-6 text-center text-white text-xs rounded-xl shadow-lg",
              line.color,
              widthByLength(line.name)
            )}
          >
            {line.name}
          </div>
        </ul>
      ))}
    </>
  );
};

OverviewLineList.propTypes = {
  overview: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OverviewLineList;
