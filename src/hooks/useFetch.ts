import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from 'modules/hooks';
import { API_STATUS } from 'constants/api';
import { ALERT_MESSAGE } from 'constants/messages';

type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

const useFetch = (method: HTTP_METHOD = 'GET') => {
  const [loading, setLoading] = useState(false);
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

      return {
        status: API_STATUS.REJECTED,
        message: error.response?.data.message || ALERT_MESSAGE.SERVER_ERROR,
      };
    } finally {
      setLoading(false);
    }
  };

  return [fetchData, loading] as const;
};

export default useFetch;
