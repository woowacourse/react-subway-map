import { useEffect, useState } from 'react';
import { IResMeta } from '../type';
import { request } from '../utils';

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const usePostRequest = (
  url: string,
  resultMessage: {
    success: string;
    fail: string;
  },
  messageCallBack = (msg: string) => window.alert(msg),
) => {
  const [dataResponse, setDataResponse] = useState<IResMeta | null>(null);

  const postData = async <T>(body: T, param = '', headers = defaultHeader) => {
    try {
      await request.post(`${url}/${param}`, headers, body);

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
    postData,
    dataResponse,
  };
};

export default usePostRequest;
