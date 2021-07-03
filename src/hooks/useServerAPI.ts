import { useState, useEffect } from 'react';
import { IResMeta } from '../type';
import { request } from '../utils';

type ResultMessageKeyType =
  | 'GET_ALL_DATA_RESPONSE'
  | 'GET_DATA_RESPONSE'
  | 'POST_DATA_RESPONSE'
  | 'DELETE_RESPONSE'
  | 'PUT_RESPONSE';

export type ResultMessage = Partial<
  {
    [key in ResultMessageKeyType]: {
      success: string;
      fail: string;
    };
  }
>;

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const useServerAPI = <T>(
  url: string,
  resultMessage: ResultMessage,
  messageCallBack = (msg: string) => window.alert(msg),
) => {
  const [data, setData] = useState<T | null>();
  const [allData, setAllData] = useState<T[] | null>();

  const [getDataResponse, setGetDataResponse] = useState<IResMeta | null>(null);
  const [getAllDataResponse, setGetAllDataResponse] = useState<IResMeta | null>(null);
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

  useEffect(() => {
    if (getAllDataResponse?.isError === true) {
      getAllDataResponse.message
        ? messageCallBack(getAllDataResponse.message)
        : resultMessage?.GET_ALL_DATA_RESPONSE?.fail &&
          messageCallBack(resultMessage.GET_ALL_DATA_RESPONSE.fail);
    } else if (getAllDataResponse?.isError === false) {
      resultMessage.GET_ALL_DATA_RESPONSE?.success &&
        messageCallBack(resultMessage.GET_ALL_DATA_RESPONSE.success);
    }
  }, [getAllDataResponse]);

  useEffect(() => {
    if (getDataResponse?.isError === true) {
      getDataResponse.message
        ? messageCallBack(getDataResponse.message)
        : resultMessage?.GET_DATA_RESPONSE?.fail &&
          messageCallBack(resultMessage.GET_DATA_RESPONSE.fail);
    } else if (getDataResponse?.isError === false) {
      resultMessage.GET_DATA_RESPONSE?.success &&
        messageCallBack(resultMessage.GET_DATA_RESPONSE.success);
    }
  }, [getDataResponse]);

  useEffect(() => {
    if (postDataResponse?.isError === true) {
      postDataResponse.message
        ? messageCallBack(postDataResponse.message)
        : resultMessage?.POST_DATA_RESPONSE?.fail &&
          messageCallBack(resultMessage.POST_DATA_RESPONSE.fail);
    } else if (postDataResponse?.isError === false) {
      resultMessage.POST_DATA_RESPONSE?.success &&
        messageCallBack(resultMessage.POST_DATA_RESPONSE.success);
    }
  }, [postDataResponse]);

  useEffect(() => {
    if (deleteDataResponse?.isError === true) {
      deleteDataResponse.message
        ? messageCallBack(deleteDataResponse.message)
        : resultMessage?.DELETE_RESPONSE?.fail &&
          messageCallBack(resultMessage.DELETE_RESPONSE.fail);
    } else if (deleteDataResponse?.isError === false) {
      resultMessage.DELETE_RESPONSE?.success &&
        messageCallBack(resultMessage.DELETE_RESPONSE.success);
    }
  }, [deleteDataResponse]);

  useEffect(() => {
    if (putDataResponse?.isError === true) {
      putDataResponse.message
        ? messageCallBack(putDataResponse.message)
        : resultMessage.PUT_RESPONSE && messageCallBack(resultMessage.PUT_RESPONSE.fail);
    } else if (putDataResponse?.isError === false) {
      resultMessage.PUT_RESPONSE?.success && messageCallBack(resultMessage.PUT_RESPONSE.success);
    }
  }, [putDataResponse]);

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
