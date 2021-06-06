import { useCookie } from '.';

import { SERVER_ID, SERVER_LIST, ACCESS_TOKEN } from '../constants';

export const useCookies = () => {
  const [accessToken, setAccessToken, removeAccessToken] = useCookie(ACCESS_TOKEN);
  const [serverId, setServerId, removeServerId] = useCookie(SERVER_ID);
  const endpoint = SERVER_LIST[serverId]?.endpoint || '';

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
