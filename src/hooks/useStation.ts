import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from './useStore';
import { ApiStatus, Station } from '../types';
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

  const { list: stationList, status, error } = station;

  const requestAddStation = async (name: Station['name']) => {
    if (!(name.length > 1 && name.length < 21)) {
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

  const requestEditStation = async ({ id, name }: Station) => {
    if (!(name.length > 1 && name.length < 21)) {
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

  const requestDeleteStation = async (id: Station['id']) => {
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
    dispatch(getStationList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error?.status === 401 || error?.httpStatus === 401) {
      dispatch(logout());
    }

    dispatch(resetError());
  }, [error, dispatch]);

  return {
    requestAddStation,
    requestEditStation,
    requestDeleteStation,
    stationList,
    status,
    error,
    isLoading: status === ApiStatus.IDLE || status === ApiStatus.PENDING,
  };
};

export default useStation;
