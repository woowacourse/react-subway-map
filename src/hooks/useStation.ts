import { useAppDispatch, useAppSelector } from ".";
import { action } from "../modules/station";

const useStation = () => {
  const { items: stations, error } = useAppSelector(({ station: { items, error } }) => ({
    items,
    error,
  }));
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

  return { stations, getStations, addStation: addStation, deleteStation, error };
};

export default useStation;
