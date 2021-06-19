import axios, { AxiosResponse } from 'axios';
import { Station } from '../types';

export const requestGetStations = (): Promise<AxiosResponse<Station[]>> => axios.get(`/stations`);

export const requestAddStation = (stationName: string): Promise<AxiosResponse<Station>> =>
  axios.post(`/stations`, {
    name: stationName,
  });

export const requestDeleteStation = (stationId: number): Promise<AxiosResponse> =>
  axios.delete(`/stations/${stationId}`);
