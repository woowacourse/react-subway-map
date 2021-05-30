import axios from 'axios';
import { LS_KEY, MOCK_SERVER, SERVERS } from '../constants';
import { getLocalStorage } from '../utils';

const request = {
  get: async (path) => {
    const serverName = getLocalStorage(LS_KEY.SERVER);
    const serverUrl = serverName ? SERVERS[serverName] : MOCK_SERVER;

    return await axios.get(serverUrl + path);
  },

  post: async (path, data) => {
    const serverName = getLocalStorage(LS_KEY.SERVER);
    const serverUrl = serverName ? SERVERS[serverName] : MOCK_SERVER;

    return await axios.post(serverUrl + path, data);
  },

  delete: async (path) => {
    const serverName = getLocalStorage(LS_KEY.SERVER);
    const serverUrl = serverName ? SERVERS[serverName] : MOCK_SERVER;

    return await axios.delete(serverUrl + path);
  },
};

export default request;
