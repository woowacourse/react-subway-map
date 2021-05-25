import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchStations, fetchUserToken } from '../redux';
import { LS_KEY, ROUTE } from '../constants';
import { setLocalStorage } from '../utils';

const useSignIn = () => {
  const { token, error } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      setLocalStorage(LS_KEY.TOKEN, token);
      history.push(ROUTE.HOME.PATH);
      dispatch(fetchStations());
    }
  }, [token, history, dispatch]);

  const signIn = ({ email, password }) =>
    dispatch(fetchUserToken({ email, password }));

  return { signIn, error };
};

export default useSignIn;
