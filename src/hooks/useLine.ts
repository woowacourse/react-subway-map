import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from './useStore';
import { ApiStatus, Line, LineAttribute } from '../types';
import { addLine, deleteLine, editLine, getLineList, resetError } from '../slices/lineSlice';
import { logout } from '../slices/authSlice';
import MESSAGE from '../constants/message';

const useLine = () => {
  const { enqueueSnackbar } = useSnackbar();
  const line = useAppSelector((state) => state.line);
  const dispatch = useAppDispatch();

  const { list: lineList, error, status } = line;

  const requestAddLine = async ({
    name,
    color,
    upStationId,
    downStationId,
    distance,
  }: LineAttribute) => {
    if (!(name.length > 1 && name.length < 11)) {
      enqueueSnackbar(MESSAGE.ERROR.INVALID_LINE_NAME_LENGTH);

      return;
    }

    try {
      const response = await dispatch(
        addLine({ name, color, upStationId, downStationId, distance })
      );

      unwrapResult(response);

      enqueueSnackbar(MESSAGE.SUCCESS.LINE_ADDED, {
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

  const requestEditLine = async ({ id, name, color }: Pick<Line, 'id' | 'name' | 'color'>) => {
    if (!(name.length > 1 && name.length < 11)) {
      enqueueSnackbar(MESSAGE.ERROR.INVALID_LINE_NAME_LENGTH);

      return;
    }

    try {
      const response = await dispatch(editLine({ id, name, color }));

      unwrapResult(response);

      enqueueSnackbar(MESSAGE.SUCCESS.LINE_EDITED, {
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

  const requestDeleteLine = async (id: Line['id']) => {
    try {
      const response = await dispatch(deleteLine(id));

      unwrapResult(response);

      enqueueSnackbar(MESSAGE.SUCCESS.LINE_DELETED, {
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
    dispatch(getLineList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error?.status === 401 || error?.httpStatus === 401) {
      dispatch(logout());
    }

    dispatch(resetError());
  }, [error, dispatch]);

  return {
    requestAddLine,
    requestEditLine,
    requestDeleteLine,
    lineList,
    error,
    status,
    isLoading: status === ApiStatus.IDLE || status === ApiStatus.PENDING,
  };
};

export default useLine;
