import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Station } from '../interfaces';
import { RootState } from '../modules';
import {
  addStationAsync,
  deleteStationAsync,
  editStationAsync,
  getStationsAsync,
  resetError as _resetError,
} from '../modules/station/stationReducer';

const useStation = () => {
  const { stations, error } = useSelector((state: RootState) => state.station);
  const { accessToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stations.length !== 0 || !accessToken) return;
    dispatch(getStationsAsync());
  }, [dispatch, stations.length, accessToken]);

  const addStation = (name: Station['name']) => {
    dispatch(addStationAsync(name));
  };

  const deleteStation = (id: Station['id']) => {
    dispatch(deleteStationAsync(id));
  };

  const editStation = (id: Station['id'], name: Station['name']) => {
    dispatch(editStationAsync({ id, name }));
  };

  const resetError = () => {
    dispatch(_resetError());
  };

  return { stations, error, addStation, deleteStation, editStation, resetError };
};

export default useStation;
