import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  addStationAsync,
  deleteStationAsync,
  getStationsAsync,
  resetError as _resetError,
} from '../modules/station/stationReducer';

const useStation = () => {
  const { stations, error } = useSelector((state: RootState) => state.station);
  const { accessToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stations.length !== 0) return;
    dispatch(getStationsAsync());
  }, [dispatch, stations.length, accessToken]);

  const addStation = (name: string) => {
    dispatch(addStationAsync({ name }));
  };

  const deleteStation = (id: number) => {
    dispatch(deleteStationAsync({ id }));
  };

  const resetError = () => {
    dispatch(_resetError());
  };

  return { stations, error, addStation, deleteStation, resetError };
};

export default useStation;
