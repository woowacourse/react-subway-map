import { action } from "../store/station";

import { useAppDispatch, useAppSelector } from "./useRedux";

const useStation = () => {
  const { items: stations, loading, error } = useAppSelector(
    ({ station: { items, loading, error } }) => ({
      items,
      loading,
      error,
    })
  );

  const dispatch = useAppDispatch();

  const getStations = async () => {
    await dispatch(action.getStations());
  };

  const addStation = async (stationName: string) => {
    await dispatch(action.addStation(stationName));
    await dispatch(action.getStations());
  };

  const deleteStation = async (id: number) => {
    await dispatch(action.deleteStation(id));
    await dispatch(action.getStations());
  };

  return {
    stations,
    loading,
    error,
    getStations,
    addStation,
    deleteStation,
  };
};

export default useStation;
