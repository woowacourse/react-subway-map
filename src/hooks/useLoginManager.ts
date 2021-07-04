import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBearerToken } from '../storage/service';
import { RootState } from './../redux/store';

const useLoginManager = (): void => {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = getBearerToken();
  }, [isLogin]);
};

export default useLoginManager;
