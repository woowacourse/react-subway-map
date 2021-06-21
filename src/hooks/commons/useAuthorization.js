import { unwrapResult } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { ACCESS_TOKEN, ROUTE } from '../../constants';
import { loginByToken } from '../../redux/userSlice';

const useAuthorization = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const accessToken = Cookies.get(ACCESS_TOKEN);

  useEffect(() => {
    const currentPage = location.pathname;

    if (!accessToken) {
      currentPage === ROUTE.SING_UP ? history.push(ROUTE.SING_UP) : history.push(ROUTE.LOGIN);
      return;
    }

    const fetchLoginByToken = async () => {
      try {
        const response = await dispatch(loginByToken({ accessToken }));
        unwrapResult(response);

        currentPage === ROUTE.LOGIN || currentPage === ROUTE.SING_UP
          ? history.push(ROUTE.STATION)
          : history.push(currentPage);
      } catch (error) {
        history.push(ROUTE.LOGIN);
      }
    };

    fetchLoginByToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAuthorization;
