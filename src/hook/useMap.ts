import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getMapAsync, resetError as _resetError } from '../modules/map/mapReducer';

const useMap = () => {
  const { mapData, error } = useSelector((state: RootState) => state.map);
  const { accessToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) return;
    dispatch(getMapAsync());
  }, [dispatch, accessToken]);

  const resetError = () => {
    dispatch(_resetError());
  };

  return { mapData, error, resetError };
};

export default useMap;
