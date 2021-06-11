import { AxiosResponse } from 'axios';
import { Station } from '../types';
import customAxios from '../util/API';

export const requestGetStations = (): Promise<AxiosResponse<Station[]>> =>
  customAxios.get(`/stations`);

export const requestAddStation = (stationName: string): Promise<AxiosResponse<Station>> =>
  customAxios.post(`/stations`, {
    name: stationName,
  });

export const requestDeleteStation = (stationId: number): Promise<AxiosResponse> =>
  customAxios.delete(`/stations/${stationId}`);
