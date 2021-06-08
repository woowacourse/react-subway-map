import { AxiosResponse } from 'axios';
import { Line } from '../types';
import customAxios from '../util/API';

export interface AddLineRequestData {
  name: string;
  upStationId: number;
  downStationId: number;
  distance: number;
  color: string;
}

export interface ModifyLineRequestData {
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

export const requestGetLines = (): Promise<AxiosResponse<Line[]>> => customAxios.get(`/lines`);

export const requestAddLine = (
  addLineRequestData: AddLineRequestData
): Promise<AxiosResponse<Line[]>> => customAxios.post(`/lines`, addLineRequestData);

export const requestDeleteLine = (lineId: number): Promise<AxiosResponse> =>
  customAxios.delete(`/lines/${lineId}`);

export const requestModifyLine = ({
  lineId,
  name,
  color,
}: ModifyLineRequestData): Promise<AxiosResponse> =>
  customAxios.put(`/lines/${lineId}`, {
    name,
    color,
  });

export const requestAddSection = ({
  lineId,
  upStationId,
  downStationId,
  distance,
}: AddSectionRequestData): Promise<AxiosResponse> =>
  customAxios.post(`/lines/${lineId}/sections`, {
    upStationId,
    downStationId,
    distance,
  });

export const requestDeleteSection = ({
  lineId,
  stationId,
}: DeleteSectionRequestData): Promise<AxiosResponse> =>
  customAxios.delete(`/lines/${lineId}/sections?stationId=${stationId}`);
