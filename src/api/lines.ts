import { AxiosResponse } from 'axios';
import { Palette } from '../constants/palette';
import { Line } from '../types';
import customAxios from '../util/API';
import { isMyEnumTypeBy } from '../util/typeGuard';

export interface AddLineRequestData {
  name: string;
  upStationId: number;
  downStationId: number;
  distance: number;
  color: Palette;
}

export interface ModifyLineRequestData {
  lineId: number;
  name: string;
  color: Palette;
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

export const requestGetLines = async (): Promise<Line[]> => {
  try {
    const { data: lines } = await customAxios.get<Line[]>(`/lines`);

    if (!lines.every((line) => isMyEnumTypeBy(Palette)(line.color))) {
      console.error('서버로 부터 받아온 line의 color가 올바른 타입이 아닙니다.');
    }

    return lines;
  } catch (error) {
    alert(error.response.data);

    return [];
  }
};

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
