import { useState, useEffect } from 'react';
import { IResMeta } from '../type';
import { request } from '../utils';

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const useGetAllRequest = <T>(
  url: string,
  resultMessage: {
    success: string;
    fail: string;
  },
  messageCallBack = (msg: string) => window.alert(msg),
) => {
  const [allData, setAllData] = useState<T[] | null>();
  const [dataResponse, setDataResponse] = useState<IResMeta | null>(null);

  const getAllData = async (headers = defaultHeader) => {
    try {
      const response = await request.get(url, headers);
      const data: T[] = response.data;

      setAllData(data);
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
    allData,
    getAllData,
    dataResponse,
  };
};

export default useGetAllRequest;
