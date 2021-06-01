import { useCookies } from 'react-cookie';

import { ACCESS_TOKEN, SERVER_ID } from '../constants';

const options = { path: '/' };

export const useCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies([ACCESS_TOKEN, SERVER_ID]);

  const accessTokenInCookie = cookies[ACCESS_TOKEN];
  const setAccessTokenInCookie = (token) => setCookie(ACCESS_TOKEN, token, options);
  const removeAccessTokenFromCookie = () => removeCookie(ACCESS_TOKEN, options);

  const serverIdInCookie = cookies[SERVER_ID];
  const setServerIdInCookie = (id) => setCookie(SERVER_ID, id, options);
  const removeServerIdFromCookie = () => removeCookie(SERVER_ID, options);

  return {
    accessTokenInCookie,
    setAccessTokenInCookie,
    removeAccessTokenFromCookie,
    serverIdInCookie,
    setServerIdInCookie,
    removeServerIdFromCookie,
  };
};
