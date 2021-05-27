import axios from 'axios';
import BACKEND from '../constants/backend';
import LOCAL_STORAGE_KEYS from '../constants/localStorageKeys';
import { CREWS } from '../types';

const isCrews = (server: string): server is CREWS => server in CREWS;

const getServer = () => {
  const server = localStorage.getItem(LOCAL_STORAGE_KEYS.SERVER);

  if (server && isCrews(server)) {
    return server;
  }

  return CREWS.DANYEE;
};

const accessToken = `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`;
const server = getServer();

const API = axios.create({
  baseURL: BACKEND[server].baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

if (accessToken) {
  API.defaults.headers.post.Authorization = accessToken;
  API.defaults.headers.put.Authorization = accessToken;
  API.defaults.headers.delete.Authorization = accessToken;
}

export default API;
