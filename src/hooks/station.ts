import { useAppDispatch, useAppSelector } from ".";
import { addStation } from "../modules/station";

const useStation = () => {
  const stations = useAppSelector(({ station: { items } }) => items);
  const dispatch = useAppDispatch();

  const createStation = (stationName: string) => {
    dispatch(addStation(stationName));
  };

  return { stations, createStation };
};

export default useStation;
