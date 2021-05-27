import { useAppDispatch, useAppSelector } from ".";
import { action } from "../modules/station";

const useStation = () => {
  const stations = useAppSelector(({ station: { items } }) => items);
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

  return { stations, getStations, addStation, deleteStation };
};

export default useStation;
