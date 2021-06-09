import React from 'react';
import { StationInterface } from 'types';

interface MapItemProps {
  color: string;
  stations: StationInterface[];
}

const MapItem = ({ color, stations }: MapItemProps) => {
  const mapItems = stations.map((station) => (
    <>
      <div className={`${color} flex justify-center items-center w-20 h-8 rounded-full`}>{station.name}</div>
      <div className={`${color} flex justify-center items-center w-10 h-2 -mx-1 mt-3 last:w-0`} />
    </>
  ));

  return <> {mapItems} </>;
};

export default MapItem;
