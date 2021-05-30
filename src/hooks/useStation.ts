import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
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

  const onGetStation = () => dispatch(getStationList());

  const onAddStation = async (name: Station['name']) => {
    if (!(name.length < 21 && name.length > 1)) {
      enqueueSnackbar(MESSAGE.ERROR.INVALID_STATION_NAME_LENGTH);

      return;
    }

    try {
      const response = await dispatch(addStation(name));

      unwrapResult(response);

      enqueueSnackbar(MESSAGE.SUCCESS.STATION_ADDED, {
        variant: 'success',
      });

      return true;
    } catch ({ message }) {
      enqueueSnackbar(message || MESSAGE.ERROR.REQUEST_FAILURE, {
        variant: 'error',
      });

      return false;
    }
  };

  const onEditStation = async ({ id, name }: Station) => {
    if (!(name.length < 21 && name.length > 1)) {
      enqueueSnackbar(MESSAGE.ERROR.INVALID_STATION_NAME_LENGTH);

      return;
    }

    try {
      const response = await dispatch(editStation({ id, name }));

      unwrapResult(response);

      enqueueSnackbar(MESSAGE.SUCCESS.STATION_EDITED, {
        variant: 'success',
      });

      return true;
    } catch ({ message }) {
      enqueueSnackbar(message || MESSAGE.ERROR.REQUEST_FAILURE, {
        variant: 'error',
      });

      return false;
    }
  };

  const onDeleteStation = async (id: Station['id']) => {
    try {
      const response = await dispatch(deleteStation(id));

      unwrapResult(response);

      enqueueSnackbar(MESSAGE.SUCCESS.STATION_DELETED, {
        variant: 'success',
      });

      return true;
    } catch ({ message }) {
      enqueueSnackbar(message || MESSAGE.ERROR.REQUEST_FAILURE, {
        variant: 'error',
      });

      return false;
    }
  };

  useEffect(() => {
    onGetStation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error?.status === 401 || error?.httpStatus === 401) {
      dispatch(logout());
    }

    dispatch(resetError());
  }, [error, dispatch]);

  return {
    onGetStation,
    onAddStation,
    onEditStation,
    onDeleteStation,
    list,
    status,
    error,
  };
};

export default useStation;
