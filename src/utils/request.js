import axios from 'axios';
import { LS_KEY, SERVERS } from '../constants';
import { getLocalStorage } from '../utils';

const request = {
  get: async (path) => {
    const serverName = getLocalStorage(LS_KEY.SERVER);

    return await axios.get(SERVERS[serverName] + path);
  },

  post: async (path, data) => {
    const serverName = getLocalStorage(LS_KEY.SERVER);

    return await axios.post(SERVERS[serverName] + path, data);
  },

  delete: async (path) => {
    const serverName = getLocalStorage(LS_KEY.SERVER);

    return await axios.delete(SERVERS[serverName] + path);
  },
};

export default request;
