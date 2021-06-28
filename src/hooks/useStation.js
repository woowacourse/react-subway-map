import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCookies } from '../hooks';
import { getStations, addStation, clearStationStatus, removeStation } from '../redux/stationSlice';

export const useStation = () => {
  const dispatch = useDispatch();
  const { stations, status } = useSelector((store) => store.station);
  const { accessToken, endpoint } = useCookies();

  const requestGetStations = () => {
    dispatch(getStations({ endpoint, accessToken }));
  };

  const requestAddStation = (name) => {
    dispatch(addStation({ endpoint, accessToken, name }));
  };

  const requestDeleteStation = (id) => {
    dispatch(removeStation({ endpoint, accessToken, id }));
  };

  const clearStatus = () => {
    dispatch(clearStationStatus());
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    requestGetStations();
  }, []);

  return {
    stations,
    status,
    requestGetStations,
    requestAddStation,
    requestDeleteStation,
    clearStatus,
  };
};
