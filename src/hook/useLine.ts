import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getLinesAsync } from '../modules/line/lineReducer';

const useLine = () => {
  const { lines, error } = useSelector((state: RootState) => state.line);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lines.length !== 0) return;

    dispatch(getLinesAsync());
  }, [dispatch, lines.length]);

  return { lines, error };
};

export default useLine;
