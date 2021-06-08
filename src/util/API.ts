import axios from 'axios';
import { API_INFO } from '../constants/api';
import { getApiOwner, getBearerToken } from '../storage/service';

const customAxios = axios.create({
  baseURL: API_INFO[getApiOwner()].endPoint,
  headers: {
    Authorization: getBearerToken(),
  },
});

export default customAxios;
