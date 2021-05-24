import { useState } from 'react';
import { request } from '../utils';

interface IError {
  isError: boolean;
  text: string;
}

const defaultHeader = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const useServerAPI = <T>(query: string) => {
  const [data, setData] = useState<T | null>();
  const [errorInfo, setErrorInfo] = useState<IError | null>({
    isError: false,
    text: '',
  });
  const [isSuccess, setSuccessState] = useState<boolean | null>(false);

  const getData = async (headers = defaultHeader) => {
    try {
      const data = await request.get(query, headers);

      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const postData = async <T>(headers = defaultHeader, body: T) => {
    try {
      await request.post(query, headers, body);

      setErrorInfo({
        isError: false,
        text: '',
      });
      setSuccessState(true);
    } catch (error) {
      console.error(error.response.status);
      setErrorInfo({
        isError: true,
        text: '회원가입에 실패했습니다.',
      });
      setSuccessState(false);
    }
  };

  return { data, getData, errorInfo, postData, isSuccess, setErrorInfo, setSuccessState };
};

export default useServerAPI;
