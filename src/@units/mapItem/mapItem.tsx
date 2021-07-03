import React from 'react';
import { StationInterface } from 'types';

interface MapItemProps {
  items: StationInterface[];
  color: string;
}

const MapItem = ({ items, color }: MapItemProps) => {
  const mapItems = items.map((item) => (
    <div key={item.id}>
      <li className="flex justify-center items-center">
        <div className={`${color} flex justify-center items-center w-12 h-12 rounded-full mx-2 mt-6`}>{item.name}</div>
      </li>
    </div>
  ));

  return <>{mapItems}</>;
};

export default MapItem;
