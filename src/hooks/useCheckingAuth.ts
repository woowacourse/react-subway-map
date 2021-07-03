import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from 'redux/store';
import { useHistory } from 'react-router';
import PATH from 'constants/path';

const useCheckingAuth = () => {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const history = useHistory();

  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken) {
      history.push(PATH.LOGIN);
    }
  }, [accessToken]);

  return accessToken;
};

export default useCheckingAuth;
