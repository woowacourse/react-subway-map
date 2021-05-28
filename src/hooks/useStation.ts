import { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from './useStore';
import { Station } from '../types';
import {
  addStation,
  deleteStation,
  editStation,
  getStationList,
  resetError,
} from '../slices/stationSlice';
import { logout } from '../slices/authSlice';
import MESSAGE from '../constants/message';

const useStation = () => {
  const { enqueueSnackbar } = useSnackbar();

  const station = useAppSelector((state) => state.station);
  const dispatch = useAppDispatch();

  const { list, status, error } = station;

  const onGet = useCallback(() => dispatch(getStationList()), [dispatch]);

  const onAdd = (name: Station['name']) => dispatch(addStation(name));

  const onEdit = ({ id, name }: Station) => dispatch(editStation({ id, name }));

  const onDelete = (id: Station['id']) => dispatch(deleteStation(id));

  useEffect(() => {
    onGet();
  }, [onGet]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message || MESSAGE.ERROR.REQUEST_FAILURE, {
        variant: 'error',
      });

      if (error.status === 401 || error.httpStatus === 401) {
        dispatch(logout());
      }

      dispatch(resetError());
    }
  }, [error, dispatch, enqueueSnackbar]);

  return {
    onGet,
    onAdd,
    onEdit,
    onDelete,
    list,
    status,
    error,
  };
};

export default useStation;
