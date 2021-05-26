import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useStore';
import { Station } from '../types';
import {
  addStation,
  deleteStation,
  editStation,
  getStationList,
  resetError,
} from '../slices/stationSlice';
import MESSAGE from '../constants/message';

const useStation = () => {
  const station = useAppSelector((state) => state.station);
  const dispatch = useAppDispatch();

  const { list, error } = station;

  const onGet = useCallback(() => dispatch(getStationList()), [dispatch]);

  const onAdd = (name: Station['name']) => dispatch(addStation(name));

  const onEdit = ({ id, name }: Station) => dispatch(editStation({ id, name }));

  const onDelete = (id: Station['id']) => dispatch(deleteStation(id));

  useEffect(() => {
    onGet();
  }, [onGet]);

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message || MESSAGE.ERROR.REQUEST_FAILURE);
      dispatch(resetError());
    }
  }, [error, dispatch]);

  return {
    onGet,
    onAdd,
    onEdit,
    onDelete,
    list,
    error,
  };
};

export default useStation;
