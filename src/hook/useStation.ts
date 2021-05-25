import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { addStationAsync, deleteStationAsync, getStationsAsync } from '../modules/station/stationReducer';

const useStation = () => {
  const { stations, error } = useSelector((state: RootState) => state.station);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stations.length !== 0) return;
    dispatch(getStationsAsync());
  }, [dispatch, stations.length]);

  const addStation = (name: string) => {
    dispatch(addStationAsync({ name }));
  };

  const deleteStation = (id: number) => {
    dispatch(deleteStationAsync({ id }));
  };

  return { stations, error, addStation, deleteStation };
};

export default useStation;
