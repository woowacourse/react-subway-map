import { useState } from 'react';
import axios from 'axios';
import { API_STATUS, BASE_URL } from 'constants/api';

type HTTP_METHOD = 'GET' | 'POST' | 'DELETE';

// TODO: refactoring, loading 상태 리턴 개선
const useFetch = <T>() => {
  const [response, setResponse] = useState<T | undefined>();

  const fetchData = async (method: HTTP_METHOD, endpoint: string, data?: unknown) => {
    try {
      const response = await axios({
        method,
        url: BASE_URL + endpoint,
        data,
      });

      setResponse(response.data);

      return { status: API_STATUS.FULFILLED };
    } catch (error) {
      console.error(error);

      return { status: API_STATUS.REJECTED, error: error.message };
    }
  };

  return { response, fetchData };
};

export default useFetch;
