import { useState } from 'react';
import { request } from '../utils';

export interface IResMeta {
  isError: boolean;
  message: string;
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
  const [deleteDataResponse, setDeleteDataResponse] = useState<IResMeta | null>(null);
  const [putDataResponse, setPutDataResponse] = useState<IResMeta | null>(null);

  const getAllData = async (headers = defaultHeader) => {
    try {
      const response = await request.get(url, headers);
      const data: T[] = response.data;

      setAllData(data);
      setGetAllDataResponse({
        isError: false,
        message: '',
      });
    } catch (error) {
      console.error(error);

      setGetAllDataResponse({
        isError: true,
        message: error.response.data.message,
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
        message: '',
      });
    } catch (error) {
      console.error(error);

      setGetDataResponse({
        isError: true,
        message: error.response.data.message,
      });
    }
  };

  const postData = async <T>(body: T, param = '', headers = defaultHeader) => {
    try {
      await request.post(`${url}/${param}`, headers, body);

      setPostDataResponse({
        isError: false,
        message: '',
      });
    } catch (error) {
      console.error(error.response);

      setPostDataResponse({
        isError: true,
        message: error.response.data.message,
      });
    }
  };

  const putData = async <T>(body: T, param: string, headers = defaultHeader) => {
    try {
      await request.put(`${url}/${param}`, headers, body);

      setPutDataResponse({
        isError: false,
        message: '',
      });
    } catch (error) {
      console.error(error.response);

      setPutDataResponse({
        isError: true,
        message: error.response.data.message,
      });
    }
  };

  // TODO: 지하철역 삭제는 현재 무조건 성공 204 응답이옴.
  const deleteData = async (param: string, headers = defaultHeader) => {
    try {
      await request.delete(`${url}/${param}`, headers);

      setDeleteDataResponse({
        isError: false,
        message: '',
      });
    } catch (error) {
      console.error(error.response);

      setDeleteDataResponse({
        isError: true,
        message: error.response.data.message,
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
    putData,
    getAllDataResponse,
    getDataResponse,
    postDataResponse,
    putDataResponse,
    deleteDataResponse,
  };
};

export default useServerAPI;
