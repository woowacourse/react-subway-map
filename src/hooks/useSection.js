import { useDispatch, useSelector } from 'react-redux';

import { useCookie } from '../hooks';
import { getMap, addSection, removeSection, clearMap, clearMapStatus } from '../redux/mapSlice';

export const useSection = () => {
  const dispatch = useDispatch();
  const { map, status } = useSelector((store) => store.map);
  const { accessTokenInCookie: accessToken, endpoint } = useCookie();

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
