import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from ".";
import { action } from "../modules/station";

const useStation = () => {
  const { items: stations, error } = useAppSelector(({ station: { items, error } }) => ({
    items,
    error,
  }));
  const dispatch = useAppDispatch();

  const getStations = async () => {
    const getStationResult = await dispatch(action.getStations());
    await unwrapResult(getStationResult);
  };

  const addStation = async (stationName: string) => {
    const addStationResult = await dispatch(action.addStation(stationName));
    await unwrapResult(addStationResult);

    getStations();
  };

  const deleteStation = async (id: number) => {
    const deleteStationResult = await dispatch(action.deleteStation(id));
    await unwrapResult(deleteStationResult);

    getStations();
  };

  return { stations, getStations, addStation: addStation, deleteStation, error };
};

export default useStation;
