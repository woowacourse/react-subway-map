import axios from 'axios';
import BACKEND from '../constants/backend';
import { CREWS } from '../types';

const getAccessToken = () => localStorage.getItem('accessToken');
const createHeaders = () => {
  const token = getAccessToken();
  if (token) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  return {
    'Content-Type': 'application/json',
  };
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
} as const;

export default API;
