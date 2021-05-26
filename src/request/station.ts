import axios from 'axios';
import { API_STATUS, BASE_URL, END_POINT } from 'constants/api';
import { Station } from 'types';

const requestGetStations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/${END_POINT.STATIONS}`);

    return { status: API_STATUS.FULFILLED, data: response.data };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestAddStation = async (newStationName: Station['name']) => {
  try {
    await axios.post(`${BASE_URL}/${END_POINT.STATIONS}`, { name: newStationName });

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestDeleteStation = async (stationId: Station['id']) => {
  try {
    await axios.delete(`${BASE_URL}/${END_POINT.STATIONS}/${stationId}`);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

export { requestGetStations, requestAddStation, requestDeleteStation };
