import { useCookie } from '.';
import { SERVER_ID, SERVER_LIST } from '../constants';

export const useServer = () => {
  const [serverId, setServerId, removeServerId] = useCookie(SERVER_ID);
  const endpoint = SERVER_LIST[serverId]?.endpoint || '';

  return {
    serverId,
    setServerId,
    removeServerId,
    endpoint,
  };
};
