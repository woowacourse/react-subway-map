import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import OverviewSectionList from "../OverviewSectionList";

const OverviewLineList = ({ overview }) => {
  const widthByTextLength = (lineNameLength) => {
    if (lineNameLength <= 3) {
      return "w-14";
    }

    if (lineNameLength <= 4) {
      return "w-16";
    }

    if (lineNameLength <= 5) {
      return "w-20";
    }

    return "";
  };

  const getLineNameBox = (line, isOpenTag) => {
    const margin = isOpenTag ? "-mr-1" : "-ml-1";

    return (
      <div
        className={cx(
          "pl-3 pr-2 pt-1 h-6 text-center text-white text-xs rounded-xl shadow-lg",
          line.color,
          widthByTextLength(line.name.length),
          margin
        )}
      >
        {line.name}
      </div>
    );
  };

  return (
    <>
      {overview.map((line) => (
        <ul key={line.name} className="flex h-20">
          {getLineNameBox(line, "open")}
          <OverviewSectionList line={line} />
          {getLineNameBox(line)}
        </ul>
      ))}
    </>
  );
};

OverviewLineList.propTypes = {
  overview: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OverviewLineList;
