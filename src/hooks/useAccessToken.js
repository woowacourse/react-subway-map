import { useCookie } from '.';

import { ACCESS_TOKEN } from '../constants';

export const useAccessToken = () => {
  const [accessToken, setAccessToken, removeAccessToken] = useCookie(ACCESS_TOKEN);

  return {
    accessToken,
    setAccessToken,
    removeAccessToken,
  };
};
