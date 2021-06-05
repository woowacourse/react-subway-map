import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from 'modules/hooks';
import { API_METHOD, RESPONSE_STATE } from '../constants';

const useFetch = (method: API_METHOD) => {
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

      return { state: RESPONSE_STATE.FULFILLED, data: response.data };
    } catch (error) {
      console.error(error);

      return { state: RESPONSE_STATE.REJECTED, message: error.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading };
};

export default useFetch;
