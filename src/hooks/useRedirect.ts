import { useEffect } from 'react';
import { useHistory } from 'react-router';
import useData from './useData';

const useRedirect = (url: string) => {
  const history = useHistory();
  const { accessToken } = useData();

  useEffect(() => {
    if (!accessToken) {
      history.push(url);
    }
  }, [accessToken]);
};

export default useRedirect;
