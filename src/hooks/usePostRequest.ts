import { useEffect, useState } from 'react';
import { IResMeta, ResultMessage } from '../type';
import { request } from '../utils';

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const usePostRequest = (
  url: string,
  resultMessage: ResultMessage,
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
    if (dataResponse?.isError === true) {
      dataResponse.message
        ? messageCallBack(dataResponse.message)
        : resultMessage?.POST_DATA_RESPONSE?.fail &&
          messageCallBack(resultMessage.POST_DATA_RESPONSE.fail);
    } else if (dataResponse?.isError === false) {
      resultMessage.POST_DATA_RESPONSE?.success &&
        messageCallBack(resultMessage.POST_DATA_RESPONSE.success);
    }
  }, [dataResponse]);

  return {
    postData,
    dataResponse,
  };
};

export default usePostRequest;
