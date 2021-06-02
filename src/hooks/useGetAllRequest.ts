import { useState, useEffect } from 'react';
import { IResMeta, ResultMessage } from '../type';
import { request } from '../utils';

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const useGetAllRequest = <T>(
  url: string,
  resultMessage: ResultMessage,
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
    if (dataResponse?.isError === true) {
      dataResponse.message
        ? messageCallBack(dataResponse.message)
        : resultMessage?.GET_ALL_DATA_RESPONSE?.fail &&
          messageCallBack(resultMessage.GET_ALL_DATA_RESPONSE.fail);
    } else if (dataResponse?.isError === false) {
      resultMessage.GET_ALL_DATA_RESPONSE?.success &&
        messageCallBack(resultMessage.GET_ALL_DATA_RESPONSE.success);
    }
  }, [dataResponse]);

  return {
    allData,
    getAllData,
    dataResponse,
  };
};

export default useGetAllRequest;
