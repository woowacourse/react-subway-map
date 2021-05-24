import axios from 'axios';
import BACKEND, { CREWS } from '../constants/backend';

const getAccessToken = () => localStorage.getItem('accessToken');
const createHeaders = () => {
  const token = getAccessToken();

  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  return {};
};

const API = {
  [CREWS.DANYEE]: axios.create({
    baseURL: BACKEND.DANYEE.baseUrl,
    headers: createHeaders(),
  }),
  [CREWS.MARK]: axios.create({
    baseURL: BACKEND.MARK.baseUrl,
    headers: createHeaders(),
  }),
  [CREWS.YORN]: axios.create({
    baseURL: BACKEND.YORN.baseUrl,
    headers: createHeaders(),
  }),
  [CREWS.CHARLIE]: axios.create({
    baseURL: BACKEND.CHARLIE.baseUrl,
    headers: createHeaders(),
  }),
};

export default API;
