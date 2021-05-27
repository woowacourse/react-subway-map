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

interface DeleteSectionRequestData {
  lineId: number;
  stationId: number;
}

export const requestGetLines = (): Promise<AxiosResponse<Line[]>> => axios.get(`/lines`);

export const requestAddLine = (
  addLineRequestData: AddLineRequestData
): Promise<AxiosResponse<Line[]>> => axios.post(`/lines`, addLineRequestData);

export const requestDeleteLine = (lineId: number): Promise<AxiosResponse> =>
  axios.delete(`/lines/${lineId}`);

export const requestModifyLine = ({
  lineId,
  name,
  color,
}: ModifyLineRequestData): Promise<AxiosResponse> =>
  axios.put(`/lines/${lineId}`, {
    name,
    color,
  });

export const requestAddSection = ({
  lineId,
  upStationId,
  downStationId,
  distance,
}: AddSectionRequestData): Promise<AxiosResponse> =>
  axios.post(`/lines/${lineId}/sections`, {
    upStationId,
    downStationId,
    distance,
  });

export const requestDeleteSection = ({
  lineId,
  stationId,
}: DeleteSectionRequestData): Promise<AxiosResponse> =>
  axios.delete(`/lines/${lineId}/sections?stationId=${stationId}`);
