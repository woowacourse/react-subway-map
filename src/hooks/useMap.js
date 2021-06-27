import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCookies } from '.';
import { getMap, addSection, removeSection, clearMap, clearMapStatus } from '../redux/mapSlice';

export const useMap = () => {
  const dispatch = useDispatch();
  const { accessToken, endpoint } = useCookies();
  const { map, status } = useSelector((store) => store.map);

  const requestGetMap = () => {
    dispatch(getMap({ endpoint, accessToken }));
  };

  const requestAddSection = ({ lineId, upStationId, downStationId, distance }) => {
    dispatch(addSection({ endpoint, accessToken, lineId, upStationId, downStationId, distance }));
  };

  const requestDeleteSection = ({ lineId, stationId }) => {
    dispatch(removeSection({ endpoint, accessToken, lineId, stationId }));
  };

  const clear = () => {
    dispatch(clearMap());
  };

  const clearStatus = () => {
    dispatch(clearMapStatus());
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    requestGetMap();
  }, []);

  return {
    map,
    status,
    requestGetMap,
    requestAddSection,
    requestDeleteSection,
    clear,
    clearStatus,
  };
};
