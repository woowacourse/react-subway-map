import { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from './useStore';
import { ApiStatus, Line, LineAttribute } from '../types';
import {
  addLine,
  addSection,
  deleteLine,
  deleteSection,
  editLine,
  getLineList,
  resetError,
} from '../slices/lineSlice';
import { logout } from '../slices/authSlice';
import MESSAGE from '../constants/message';

const useLine = () => {
  const { enqueueSnackbar } = useSnackbar();

  const line = useAppSelector((state) => state.line);
  const dispatch = useAppDispatch();

  const { list, error, status } = line;

  const get = useCallback(() => dispatch(getLineList()), [dispatch]);

  const add = ({ name, color, upStationId, downStationId, distance }: LineAttribute) =>
    dispatch(addLine({ name, color, upStationId, downStationId, distance }));

  const edit = ({ id, name, color }: Pick<Line, 'id' | 'name' | 'color'>) =>
    dispatch(editLine({ id, name, color }));

  const remove = (id: Line['id']) => dispatch(deleteLine(id));

  useEffect(() => {
    get();
  }, [get]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message || MESSAGE.ERROR.REQUEST_FAILURE, {
        variant: 'error',
      });

      if (error.status === 401) {
        dispatch(logout());
      }

      dispatch(resetError());
    }
  }, [error, dispatch, enqueueSnackbar]);

  return {
    get,
    add,
    edit,
    remove,
    addSection,
    deleteSection,
    list,
    error,
    status,
    isLoading: status === ApiStatus.IDLE || status === ApiStatus.PENDING,
  };
};

export default useLine;
