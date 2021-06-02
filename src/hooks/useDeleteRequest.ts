import { useState, useEffect } from 'react';
import { IResMeta, ResultMessage } from '../type';
import { request } from '../utils';

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const useDeleteRequest = (
  url: string,
  resultMessage: ResultMessage,
  messageCallBack = (msg: string) => window.alert(msg),
) => {
  const [dataResponse, setDataResponse] = useState<IResMeta | null>(null);

  const deleteData = async (param: string, headers = defaultHeader) => {
    try {
      await request.delete(`${url}/${param}`, headers);

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
        : resultMessage?.DELETE_RESPONSE?.fail &&
          messageCallBack(resultMessage.DELETE_RESPONSE.fail);
    } else if (dataResponse?.isError === false) {
      resultMessage.DELETE_RESPONSE?.success &&
        messageCallBack(resultMessage.DELETE_RESPONSE.success);
    }
  }, [dataResponse]);

  return {
    deleteData,
    dataResponse,
  };
};

export default useDeleteRequest;
