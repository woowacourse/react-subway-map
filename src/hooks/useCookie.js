import { useCookies } from 'react-cookie';

import { ACCESS_TOKEN, SERVER_ID, SERVER_LIST } from '../constants';

const options = { path: '/' };

export const useCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies([ACCESS_TOKEN, SERVER_ID]);

  const accessToken = cookies[ACCESS_TOKEN];
  const setAccessToken = (token) => setCookie(ACCESS_TOKEN, token, options);
  const removeAccessToken = () => removeCookie(ACCESS_TOKEN, options);

  const serverId = cookies[SERVER_ID];
  const setServerId = (id) => setCookie(SERVER_ID, id, options);
  const removeServerId = () => removeCookie(SERVER_ID, options);
  const endpoint = SERVER_LIST[serverId]?.endpoint;

  return {
    accessToken,
    setAccessToken,
    removeAccessToken,
    serverId,
    setServerId,
    removeServerId,
    endpoint,
  };
};
