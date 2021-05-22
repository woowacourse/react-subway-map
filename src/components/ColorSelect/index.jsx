import React from "react";
import cx from "classnames";

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

const ColorSelect = () => (
  <div className="grid gap-4 grid-cols-5 mb-4">
    {lineColors.map(([name, color]) => (
      <button
        type="button"
        className={cx(
          "w-10 h-10 rounded-full focus:outline-none hover:ring-2 focus:ring-2",
          color
        )}
        aria-label={`${name}-color-button`}
      />
    ))}
  </div>
);

export default ColorSelect;
