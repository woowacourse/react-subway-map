import axios, { AxiosResponse } from 'axios';
import { Station } from '../types';

export const requestGetStations = (baseURL: string): Promise<AxiosResponse<Station[]>> =>
  axios.get(`${baseURL}/stations`);
