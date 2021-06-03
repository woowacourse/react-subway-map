import { useState, useEffect } from 'react';
import { IResMeta, ResultMessage } from '../type';
import { request } from '../utils';

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const useGetRequest = <T>(
  resultMessage: ResultMessage,
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
    if (dataResponse?.isError === true) {
      dataResponse.message
        ? messageCallBack(dataResponse.message)
        : resultMessage?.GET_DATA_RESPONSE?.fail &&
          messageCallBack(resultMessage.GET_DATA_RESPONSE.fail);
    } else if (dataResponse?.isError === false) {
      resultMessage.GET_DATA_RESPONSE?.success &&
        messageCallBack(resultMessage.GET_DATA_RESPONSE.success);
    }
  }, [dataResponse]);

  return {
    data,
    getData,
    dataResponse,
  };
};

export default useGetRequest;
