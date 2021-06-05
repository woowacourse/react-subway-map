import { useDispatch, useSelector } from 'react-redux';

import { useAccessToken, useServer } from '../hooks';
import { getStations, addStation, clearStationStatus, removeStation } from '../redux/stationSlice';

export const useStation = () => {
  const dispatch = useDispatch();
  const { stations, status } = useSelector((store) => store.station);
  const { accessToken } = useAccessToken();
  const { endpoint } = useServer();

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

  return {
    stations,
    status,
    requestGetStations,
    requestAddStation,
    requestDeleteStation,
    clearStatus,
  };
};
