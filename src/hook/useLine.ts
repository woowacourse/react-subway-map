import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddLineRequest } from '../interfaces/line';
import { RootState } from '../modules';
import { addLineAsync, deleteLineAsync, getLinesAsync, resetError as _resetError } from '../modules/line/lineReducer';

const useLine = () => {
  const { lines, error } = useSelector((state: RootState) => state.line);
  const { accessToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lines.length !== 0 || !accessToken) return;

    dispatch(getLinesAsync());
  }, [dispatch, lines.length, accessToken]);

  const addLine = (newLine: AddLineRequest) => {
    dispatch(addLineAsync(newLine));
  };

  const deleteLine = (id: number) => {
    dispatch(deleteLineAsync(id));
  };

  const resetError = () => {
    dispatch(_resetError());
  };

  return { lines, addLine, deleteLine, error, resetError };
};

export default useLine;
