import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadLines } from '../redux/lineSlice';
import { Line } from '../types';
import { RootState, useAppDispatch } from './../redux/store';

interface LinesState {
  lines: Line[];
  isLoading: boolean;
  errorMessage: string;
}

const useLines = (): LinesState => {
  const { lines, isLoading, errorMessage } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadLines());
  }, []);

  return { lines, isLoading, errorMessage };
};

export default useLines;
