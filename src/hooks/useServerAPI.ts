import { useState } from 'react';
import { request } from '../utils';

export interface IResMeta {
  isError: boolean;
  text: string | null;
  status: number;
}

//TODO: error.response.message 백엔드에서 text로 받기

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const useServerAPI = <T>(query: string) => {
  const [data, setData] = useState<T | null>();
  const [resMeta, setResMeta] = useState<IResMeta | null>(null);

  const getData = async (headers = defaultHeader) => {
    try {
      const response = await request.get(query, headers);

      setData(response.data);
      setResMeta({
        isError: false,
        text: null,
        status: response.status,
      });
    } catch (error) {
      console.error(error);

      setResMeta({
        isError: true,
        text: error.message,
        status: error.response.status,
      });
    }
  };

  const postData = async <T>(headers = defaultHeader, body: T) => {
    try {
      const response = await request.post(query, headers, body);

      setResMeta({
        isError: false,
        text: '',
        status: response.status,
      });
    } catch (error) {
      console.error(error.response);

      setResMeta({
        isError: true,
        text: error.message,
        status: error.response.status,
      });
    }
  };

  return { data, getData, resMeta, postData, setResMeta };
};

export default useServerAPI;
