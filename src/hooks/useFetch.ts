import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from 'modules/hooks';
import { API_STATUS } from 'constants/api';

type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

const useFetch = (method: HTTP_METHOD) => {
  const [loading, setLoading] = useState<boolean>(false);
  const BASE_URL = useAppSelector((state) => state.serverSlice.server);

  const fetchData = async (endpoint: string, data?: unknown) => {
    setLoading(true);
    try {
      const response = await axios({
        method,
        url: `${BASE_URL}/${endpoint}`,
        data,
      });

      return { status: API_STATUS.FULFILLED, data: response.data };
    } catch (error) {
      console.error(error);

      return { status: API_STATUS.REJECTED, message: error.response.data.message };
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading };
};

export default useFetch;
