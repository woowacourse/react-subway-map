import { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from './useStore';
import { ApiStatus, Line, LineAttribute, SectionAttribute, Station } from '../types';
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

  const onGetLine = useCallback(() => dispatch(getLineList()), [dispatch]);

  const onAddLine = ({ name, color, upStationId, downStationId, distance }: LineAttribute) =>
    dispatch(addLine({ name, color, upStationId, downStationId, distance }));

  const onEditLine = ({ id, name, color }: Pick<Line, 'id' | 'name' | 'color'>) =>
    dispatch(editLine({ id, name, color }));

  const onDeleteLine = (id: Line['id']) => dispatch(deleteLine(id));

  const onAddSection = ({ lineId, data }: SectionAttribute) =>
    dispatch(addSection({ lineId, data }));

  const onDeleteSection = ({
    lineId,
    stationId,
  }: {
    lineId: Line['id'];
    stationId: Station['id'];
  }) => dispatch(deleteSection({ lineId, stationId }));

  useEffect(() => {
    onGetLine();
  }, [onGetLine]);

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
    onGetLine,
    onAddLine,
    onEditLine,
    onDeleteLine,
    onAddSection,
    onDeleteSection,
    list,
    error,
    status,
    isLoading: status === ApiStatus.IDLE || status === ApiStatus.PENDING,
  };
};

export default useLine;
