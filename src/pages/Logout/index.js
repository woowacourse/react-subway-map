import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { logout } from '../../redux/userSlice';
import { clearLine } from '../../redux/lineSlice';
import { clearMap } from '../../redux/mapSlice';
import { clearStation } from '../../redux/stationSlice';

import { ROUTE } from '../../constants';

export const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clearStore = () => {
    dispatch(clearLine());
    dispatch(clearStation());
    dispatch(clearMap());
  };

  // TODO : 로그아웃이 안되는 경우(store의 state가 변하지 않는 경우도 우리가 예외처리를 해줘야하는걸까요?)
  useEffect(() => {
    dispatch(logout());
    clearStore();
    history.push(ROUTE.LOGIN);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
