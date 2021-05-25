import axios, { AxiosResponse } from 'axios';
import { Station } from '../types';

export const requestGetStations = (baseURL: string): Promise<AxiosResponse<Station[]>> =>
  axios.get(`${baseURL}/stations`);

export const requestAddStation = (
  baseURL: string,
  stationName: string
): Promise<AxiosResponse<Station>> =>
  axios.post(`${baseURL}/stations`, {
    name: stationName,
  });
