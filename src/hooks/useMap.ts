import { useEffect } from 'react';
import { getLineList } from '../slices/lineSlice';
import { useAppDispatch, useAppSelector } from './useStore';

const useMap = () => {
  const server = useAppSelector((state) => state.auth.server);
  const line = useAppSelector((state) => state.line);
  const dispatch = useAppDispatch();

  const { list: lineList } = line;

  useEffect(() => {
    dispatch(getLineList());
  }, [server, dispatch]);

  return { lineList };
};

export default useMap;
