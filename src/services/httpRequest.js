import axios from 'axios';

import Cookies from 'js-cookie';

import { ACCESS_TOKEN, SERVER_ID, SERVER_LIST } from '../constants';

const getBaseUrl = () => SERVER_LIST[Cookies.get(SERVER_ID)].baseUrl;
const getToken = () => Cookies.get(ACCESS_TOKEN);

const getHttpInstance = () => {
  return axios.create({
    timeout: 3000,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const request = {
  get: async (path) => await getHttpInstance().get(`${getBaseUrl()}${path}`),
  post: async (path, data) => await getHttpInstance().post(`${getBaseUrl()}${path}`, data),
  postWithoutToken: async (path, data) => await axios.post(`${getBaseUrl()}${path}`, data),
  delete: async (path) => await getHttpInstance().delete(`${getBaseUrl()}${path}`),
};
