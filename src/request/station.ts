import axios from 'axios';
import { API_STATUS, END_POINT } from 'constants/api';
import { Station } from 'types';

const requestGetStations = async (BASE_URL: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${END_POINT.STATIONS}`);

    return { status: API_STATUS.FULFILLED, data: response.data };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestAddStation = async (BASE_URL: string, newStationName: Station['name']) => {
  try {
    await axios.post(`${BASE_URL}/${END_POINT.STATIONS}`, { name: newStationName });

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestEditStation = async (
  BASE_URL: string,
  newStationName: Station['name'],
  stationId: Station['id'],
) => {
  try {
    await axios.put(`${BASE_URL}/${END_POINT.STATIONS}/${stationId}`, { name: newStationName });

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestDeleteStation = async (BASE_URL: string, stationId: Station['id']) => {
  try {
    await axios.delete(`${BASE_URL}/${END_POINT.STATIONS}/${stationId}`);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

export { requestGetStations, requestAddStation, requestEditStation, requestDeleteStation };
