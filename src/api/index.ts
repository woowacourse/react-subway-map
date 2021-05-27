import axios from 'axios';
import BACKEND from '../constants/backend';
import { CREWS } from '../types';

const getAccessToken = () => localStorage.getItem('accessToken');
const getServer = () => {
  const currentServer = localStorage.getItem('server') as CREWS;
  return currentServer || CREWS.DANYEE;
};

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

const API = axios.create({
  baseURL: BACKEND[getServer()].baseUrl,
  headers: createHeaders(),
});

export default API;
