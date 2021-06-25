import { AxiosResponse } from 'axios';
import { Station } from '../types';
import customAxios from '../util/API';

interface DummyAxiosResponse<T> {
  data: T;
}

export const requestGetStations = (): Promise<AxiosResponse<Station[]>> =>
  customAxios.get(`/stations`);

export const requestGetStationTransferInfoList = async (): Promise<
  AxiosResponse<Station[]> | DummyAxiosResponse<Station[]>
> => {
  try {
    const transferInfoList = await customAxios.get(`/stations/transfer`);

    return transferInfoList;
  } catch (error) {
    alert('환승역 가져오기에 실패했습니다.');
    return { data: [] };
  }
};

export const requestAddStation = (stationName: string): Promise<AxiosResponse<Station>> =>
  customAxios.post(`/stations`, {
    name: stationName,
  });

export const requestDeleteStation = (stationId: number): Promise<AxiosResponse> =>
  customAxios.delete(`/stations/${stationId}`);
