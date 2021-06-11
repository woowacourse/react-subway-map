import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

interface State {
  auth: {
    accessToken?: string;
  };
}

const useRedirect = (url: string) => {
  const history = useHistory();
  const accessToken = useSelector<State>((state) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken) {
      history.push(url);
    }
  }, [accessToken]);
};

export default useRedirect;
