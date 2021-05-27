import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useStore';
import { Line, LineAttribute } from '../types';
import { addLine, deleteLine, editLine, getLineList, resetError } from '../slices/lineSlice';
import MESSAGE from '../constants/message';

const useLine = () => {
  const line = useAppSelector((state) => state.line);
  const dispatch = useAppDispatch();

  const { list, error } = line;

  const onGet = useCallback(() => dispatch(getLineList()), [dispatch]);

  const onAdd = ({ name, color, upStationId, downStationId, distance }: LineAttribute) =>
    dispatch(addLine({ name, color, upStationId, downStationId, distance }));

  const onEdit = ({ id, name, color }: Line) => dispatch(editLine({ id, name, color }));

  const onDelete = (id: Line['id']) => dispatch(deleteLine(id));

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

export default useLine;
