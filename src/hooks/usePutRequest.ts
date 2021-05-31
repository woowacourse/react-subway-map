import { useEffect, useState } from 'react';
import { IResMeta, ResultMessage } from '../type';
import { request } from '../utils';

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const usePutRequest = (
  url: string,
  resultMessage: ResultMessage,
  messageCallBack = (msg: string) => window.alert(msg),
) => {
  const [dataResponse, setDataResponse] = useState<IResMeta | null>(null);

  const putData = async <T>(body: T, param: string, headers = defaultHeader) => {
    try {
      await request.put(`${url}/${param}`, headers, body);

      setDataResponse({
        isError: false,
        message: '',
      });
    } catch (error) {
      console.error(error.response);

      setDataResponse({
        isError: true,
        message: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    if (dataResponse?.isError === true) {
      dataResponse.message
        ? messageCallBack(dataResponse.message)
        : resultMessage.PUT_RESPONSE && messageCallBack(resultMessage.PUT_RESPONSE.fail);
    } else if (dataResponse?.isError === false) {
      resultMessage.PUT_RESPONSE?.success && messageCallBack(resultMessage.PUT_RESPONSE.success);
    }
  }, [dataResponse]);

  useEffect(
    () => () => {
      setDataResponse(null);
    },
    [],
  );

  return {
    putData,
    dataResponse,
  };
};

export default usePutRequest;
