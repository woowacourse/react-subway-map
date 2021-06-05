import { useEffect, useState } from 'react';
import { IResMeta } from '../type';
import { request } from '../utils';

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const usePutRequest = (
  url: string,
  resultMessage: {
    success: string;
    fail: string;
  },
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
    const isErrorResponse = dataResponse?.isError;
    const responseErrorMessage = dataResponse?.message;

    if (isErrorResponse === true) {
      messageCallBack(responseErrorMessage ? responseErrorMessage : resultMessage.fail);
    } else if (isErrorResponse === false && resultMessage.success.length > 0) {
      messageCallBack(resultMessage.success);
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
