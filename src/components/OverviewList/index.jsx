import React from "react";
import { useSelector } from "react-redux";
import { selectOverviewList } from "../../pages/Overview/slice";
import OverviewListItem from "../OverviewListItem";

const OverviewList = () => {
  const list = useSelector(selectOverviewList);

  return (
    list.length > 0 && (
      <ul className="space-y-6">
        {list.map((item) => (
          <OverviewListItem key={item.id} item={item} />
        ))}
      </ul>
    )
  );
};

export default OverviewList;
