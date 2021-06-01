import React from "react";
import { useSelector } from "react-redux";
import { selectLinesList } from "../../pages/Lines/slice";
import LinesItems from "../LinesItems";

const LinesList = () => {
  const lineList = useSelector(selectLinesList);

  return (
    lineList.length > 0 && (
      <ul className="mt-4">
        {[...lineList].reverse().map(({ id, name, color }) => (
          <LinesItems key={id} id={id} name={name} color={color} />
        ))}
      </ul>
    )
  );
};

export default LinesList;
