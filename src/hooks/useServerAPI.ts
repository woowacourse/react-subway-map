import { useState } from 'react';
import { request } from '../utils';

export interface IResMeta {
  isError: boolean;
  status: number;
}

//TODO: error.response.message 백엔드에서 text로 받기

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const useServerAPI = <T>(url: string) => {
  const [data, setData] = useState<T | null>();
  const [allData, setAllData] = useState<T[] | null>();

  const [getAllDataResponse, setGetAllDataResponse] = useState<IResMeta | null>(null);
  const [getDataResponse, setGetDataResponse] = useState<IResMeta | null>(null);
  const [postDataResponse, setPostDataResponse] = useState<IResMeta | null>(null);
  const [getDeleteResponse, setDeleteDataResponse] = useState<IResMeta | null>(null);

  const getAllData = async (headers = defaultHeader) => {
    try {
      const response = await request.get(url, headers);

      const data: T[] = response.data;

      setAllData(data);
      setGetAllDataResponse({
        isError: false,
        status: response.status,
      });
    } catch (error) {
      console.error(error);

      setGetAllDataResponse({
        isError: true,
        status: error.response.status,
      });
    }
  };

  const getData = async (param: string, headers = defaultHeader) => {
    try {
      const response = await request.get(`${url}/${param}`, headers);

      const data: T = response.data;

      setData(data);
      setGetDataResponse({
        isError: false,
        status: response.status,
      });
    } catch (error) {
      console.error(error);

      setGetDataResponse({
        isError: true,
        status: error.response.status,
      });
    }
  };

  const postData = async <T>(body: T, param = '', headers = defaultHeader) => {
    try {
      const response = await request.post(`${url}/${param}`, headers, body);

      setPostDataResponse({
        isError: false,
        status: response.status,
      });
    } catch (error) {
      console.error(error.response);

      setPostDataResponse({
        isError: true,
        status: error.response.status,
      });
    }
  };

  // TODO: 지하철역 삭제는 현재 무조건 성공 204 응답이옴.
  const deleteData = async (param: string, headers = defaultHeader) => {
    try {
      const response = await request.delete(`${url}/${param}`, headers);

      setDeleteDataResponse({
        isError: false,
        status: response.status,
      });
    } catch (error) {
      console.error(error.response);

      setDeleteDataResponse({
        isError: true,
        status: error.response.status,
      });
    }
  };

  return {
    data,
    allData,
    getAllData,
    getData,
    postData,
    deleteData,
    getAllDataResponse,
    getDataResponse,
    postDataResponse,
    getDeleteResponse,
  };
};

export default useServerAPI;
