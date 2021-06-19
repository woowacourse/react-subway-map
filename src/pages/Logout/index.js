import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import Cookies from 'js-cookie';

import { logout } from '../../redux/userSlice';
import { clearStation, clearStationProgress } from '../../redux/stationSlice';
import { clearLine, clearLineProgress } from '../../redux/lineSlice';
import { clearMap, clearMapProgress } from '../../redux/mapSlice';

import { ACCESS_TOKEN, ROUTE } from '../../constants';

export const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clearStore = () => {
    dispatch(clearStation());
    dispatch(clearStationProgress());
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
