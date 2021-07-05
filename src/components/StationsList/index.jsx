import React from "react";
import { useSelector } from "react-redux";
import { selectStationsList } from "../../pages/Stations/slice";
import StationsListItem from "../StationsListItem";

const StationsList = () => {
  const list = useSelector(selectStationsList);

  return (
    list.length > 0 && (
      <ul className="mt-8 pb-8 pl-8 pr-6 py-4 w-144 rounded-sm shadow-md space-y-6">
        {Array.from(list)
          .reverse()
          .map(({ id, name }) => (
            <StationsListItem key={id} id={id} name={name} />
          ))}
      </ul>
    )
  );
};

export default StationsList;
