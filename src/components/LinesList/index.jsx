import React from "react";
import { useSelector } from "react-redux";
import { selectLinesList } from "../../pages/Lines/slice";
import LinesListItem from "../LinesListItem";

const LinesList = () => {
  const list = useSelector(selectLinesList);

  return (
    list.length > 0 && (
      <ul className="mt-4">
        {[...list].reverse().map(({ id, name, color }) => (
          <LinesListItem key={id} id={id} name={name} color={color} />
        ))}
      </ul>
    )
  );
};

export default LinesList;
