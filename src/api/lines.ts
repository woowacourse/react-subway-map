import axios, { AxiosResponse } from 'axios';
import { Line } from '../types';

export interface AddLineRequestData {
  name: string;
  color: string;
  upStationId: number;
  downStationId: number;
  distance: number;
}

export interface ModifyLineRequestData {
  // TODO: lineId -> id
  lineId: number;
  name: string;
  color: string;
}

interface AddSectionRequestData {
  lineId: number;
  upStationId: number;
  downStationId: number;
  distance: number;
}

export const requestGetLines = (baseURL: string): Promise<AxiosResponse<Line[]>> =>
  axios.get(`${baseURL}/lines`);

export const requestAddLine = (
  baseURL: string,
  addLineRequestData: AddLineRequestData
): Promise<AxiosResponse<Line[]>> => axios.post(`${baseURL}/lines`, addLineRequestData);

export const requestDeleteLine = (baseURL: string, lineId: number): Promise<AxiosResponse> =>
  axios.delete(`${baseURL}/lines/${lineId}`);

export const requestModifyLine = (
  baseURL: string,
  { lineId, name, color }: ModifyLineRequestData
): Promise<AxiosResponse> =>
  axios.put(`${baseURL}/lines/${lineId}`, {
    name,
    color,
  });

export const requestAddSection = (
  baseURL: string,
  { lineId, upStationId, downStationId, distance }: AddSectionRequestData
): Promise<AxiosResponse> =>
  axios.post(`${baseURL}/lines/${lineId}/sections`, {
    upStationId,
    downStationId,
    distance,
  });
