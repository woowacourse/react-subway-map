import axios from 'axios';
import { API_INFO } from '../constants/API';
import { getAPIOwner, getBearerToken } from '../storage/service';

const customAxios = axios.create({
  baseURL: API_INFO[getAPIOwner()].endPoint,
  headers: {
    Authorization: getBearerToken(),
  },
});

export default customAxios;
