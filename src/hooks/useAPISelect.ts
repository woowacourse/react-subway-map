import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { currentAPI } from '../API/API';
import { API_URL } from '../constants/API';
import { APIAction } from '../state/slices/API';
import { lineAction } from '../state/slices/line';
import { loginAction } from '../state/slices/login';
import { useAppDispatch } from '../state/store';
import { APIName } from '../types';

const useAPISelect = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(lineAction.initLineId());
    dispatch(loginAction.logout());
  }, [dispatch]);

  const selectAPI = (name: APIName) => {
    currentAPI.baseUrl = API_URL[name];
    dispatch(APIAction.setName(name));
    history.push('/login');
  };

  return { selectAPI };
};

export default useAPISelect;
