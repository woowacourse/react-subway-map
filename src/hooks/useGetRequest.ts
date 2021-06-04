import { useState, useEffect } from 'react';
import { IResMeta } from '../type';
import { request } from '../utils';

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const useGetRequest = <T>(
  resultMessage: {
    success: string;
    fail: string;
  },
  messageCallBack = (msg: string) => window.alert(msg),
) => {
  const [data, setData] = useState<T | null>();
  const [dataResponse, setDataResponse] = useState<IResMeta | null>(null);

  const getData = async (url: string, headers = defaultHeader) => {
    try {
      const response = await request.get(url, headers);
      const _data: T = response.data;

      setData(_data);
      setDataResponse({
        isError: false,
        message: '',
      });
    } catch (error) {
      console.error(error);

      setDataResponse({
        isError: true,
        message: error.response.data.message,
      });
    }
  };

  useEffect(
    () => () => {
      setDataResponse(null);
    },
    [],
  );

  useEffect(() => {
    const isErrorResponse = dataResponse?.isError;
    const responseErrorMessage = dataResponse?.message;

    if (isErrorResponse === true) {
      messageCallBack(responseErrorMessage ? responseErrorMessage : resultMessage.fail);
    } else if (isErrorResponse === false && resultMessage.success.length > 0) {
      messageCallBack(resultMessage.success);
    }
  }, [dataResponse]);

  return {
    data,
    getData,
    dataResponse,
  };
};

export default useGetRequest;
