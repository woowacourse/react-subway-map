import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { ACCESS_TOKEN, ROUTE } from '../../constants';
import { clearLine, clearLineProgress } from '../../redux/lineSlice';
import { clearMap, clearMapProgress } from '../../redux/mapSlice';
import { clearStations, clearStationState } from '../../redux/stationSlice';
import { logout } from '../../redux/userSlice';

export const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clearStore = () => {
    dispatch(clearStations());
    dispatch(clearStationState());
    dispatch(clearLine());
    dispatch(clearLineProgress());
    dispatch(clearMap());
    dispatch(clearMapProgress());
  };

  useEffect(() => {
    dispatch(logout());
    clearStore();
    Cookies.remove(ACCESS_TOKEN);
    history.push(ROUTE.LOGIN);
  }, []);

  return null;
};
