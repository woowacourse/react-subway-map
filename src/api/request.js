import axios from 'axios';
import { LS_KEY, SERVERS } from '../constants';
import { getLocalStorage } from '../utils';

const request = {
  get: async (path) => {
    const serverName = getLocalStorage(LS_KEY.SERVER);

    return await axios({
      method: 'get',
      url: path,
      baseURL: SERVERS[serverName],
    });
  },

  post: async (path, data) => {
    const serverName = getLocalStorage(LS_KEY.SERVER);

    return await axios({
      method: 'post',
      url: path,
      baseURL: SERVERS[serverName],
      headers: { 'content-type': 'application/json' },
      data,
    });
  },
};

export default request;
