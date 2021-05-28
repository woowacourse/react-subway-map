import { useState, useEffect } from 'react';
import { IResMeta } from '../type';
import { request } from '../utils';

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

  useEffect(
    () => () => {
      setGetAllDataResponse(null);
      setGetDataResponse(null);
      setPostDataResponse(null);
      setDeleteDataResponse(null);
      setPutDataResponse(null);
    },
    [],
  );

  // useEffect(() => {
  //   if (addLineResponse?.isError === true) {
  //     window.alert(addLineResponse.message);
  //   } else if (addLineResponse?.isError === false) {
  //     window.alert('노선 추가 성공');
  //   }
  // }, [addLineResponse]);

  // useEffect(() => {
  //   if (editLineResponse?.isError === true) {
  //     window.alert(editLineResponse.message);
  //   } else if (editLineResponse?.isError === false) {
  //     window.alert('노선 수정 성공');
  //   }
  // }, [editLineResponse]);

  // useEffect(() => {
  //   if (deleteLineResponse?.isError === true) {
  //     window.alert(deleteLineResponse.message);
  //   } else if (deleteLineResponse?.isError === false) {
  //     window.alert('노선 제거 성공');
  //   }
  // }, [deleteLineResponse]);

  // useEffect(() => {
  //   if (getAllLineResponse?.isError === true) {
  //     window.alert(getAllLineResponse.message);
  //   }
  // }, [getAllLineResponse]);

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
