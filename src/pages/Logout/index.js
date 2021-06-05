import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';

import { logout } from '../../redux/userSlice';
import { clearStation, clearStationProgress } from '../../redux/stationSlice';
import { clearLine, clearLineProgress } from '../../redux/lineSlice';
import { clearMap } from '../../redux/mapSlice';

import { ACCESS_TOKEN, ROUTE } from '../../constants';

export const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const removeCookies = useCookies()[2];

  const clearStore = () => {
    dispatch(clearStation());
    dispatch(clearStationProgress());
    dispatch(clearLine());
    dispatch(clearLineProgress());
    dispatch(clearMap());
  };

  // TODO : 로그아웃이 안되는 경우(store의 state가 변하지 않는 경우도 우리가 예외처리를 해줘야하는걸까요?)
  useEffect(() => {
    dispatch(logout());
    clearStore();
    removeCookies(ACCESS_TOKEN);
    history.push(ROUTE.LOGIN);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
