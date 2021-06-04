import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

const lineColors = [
  ["line1", "bg-line1 hover:ring-line1 focus:ring-line1"],
  ["line2", "bg-line2 hover:ring-line2 focus:ring-line2"],
  ["line3", "bg-line3 hover:ring-line3 focus:ring-line3"],
  ["line4", "bg-line4 hover:ring-line4 focus:ring-line4"],
  ["line5", "bg-line5 hover:ring-line5 focus:ring-line5"],
  ["line6", "bg-line6 hover:ring-line6 focus:ring-line6"],
  ["line7", "bg-line7 hover:ring-line7 focus:ring-line7"],
  ["line8", "bg-line8 hover:ring-line8 focus:ring-line8"],
  ["line9", "bg-line9 hover:ring-line9 focus:ring-line9"],
  [
    "lineGyeonguiJungang",
    "bg-lineGyeonguiJungang hover:ring-lineGyeonguiJungang focus:ring-lineGyeonguiJungang",
  ],
];

const ColorSelect = ({ value, onChange }) => (
  <>
    <span id="color-select-label" className="m-6 text-gray-400">
      노선 색상을 선택해주세요.
    </span>
    <div
      className="grid gap-4 grid-cols-5 mb-4"
      role="listbox"
      aria-labelledby="color-select-label"
    >
      {lineColors.map(([name, color]) => (
        <button
          key={name}
          type="button"
          value={color}
          onClick={onChange}
          className={cx(
            "w-10 h-10 rounded-full focus:outline-none hover:ring-2 focus:ring-2",
            color
          )}
          aria-label={`${name}-color-button`}
          role="option"
          aria-selected={value === color}
        />
      ))}
    </div>
    <div className="flex items-center">
      <span id="selected-color-label" className="m-6 text-gray-400">
        선택된 색상:
      </span>
      <span
        className={cx(
          "w-6 h-6 bg-gray-300 rounded-full focus:outline-none",
          value
        )}
        aria-labelledby="selected-color-label"
      />
    </div>
  </>
);

ColorSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ColorSelect;
