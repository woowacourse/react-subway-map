import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddLine } from '../interfaces';
import { RootState } from '../modules';
import { addLineAsync, deleteLineAsync, getLinesAsync } from '../modules/line/lineReducer';

const useLine = () => {
  const { lines, error } = useSelector((state: RootState) => state.line);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lines.length !== 0) return;

    dispatch(getLinesAsync());
  }, [dispatch, lines.length]);

  const addLine = (newLine: AddLine) => {
    dispatch(addLineAsync({ line: newLine }));
  };

  const deleteLine = (id: number) => {
    dispatch(deleteLineAsync({ id }));
  };

  return { lines, addLine, deleteLine, error };
};

export default useLine;
