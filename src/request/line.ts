import axios from 'axios';
import { API_STATUS, END_POINT } from 'constants/api';
import { Line, Station } from 'types';

const requestGetLines = async (BASE_URL: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${END_POINT.LINES}`);

    return { status: API_STATUS.FULFILLED, data: response.data };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestGetLine = async (BASE_URL: string, lineId: Line['id']) => {
  try {
    const response = await axios.get(`${BASE_URL}/${END_POINT.LINES}/${lineId}`);

    return { status: API_STATUS.FULFILLED, data: response.data };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestDeleteLine = async (BASE_URL: string, lineId: Line['id']) => {
  try {
    await axios.delete(`${BASE_URL}/${END_POINT.LINES}/${lineId}`);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestAddLine = async (BASE_URL: string, newLine: unknown) => {
  try {
    await axios.post(`${BASE_URL}/${END_POINT.LINES}`, newLine);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestEditLine = async (BASE_URL: string, lineId: Line['id'], updatedLine: unknown) => {
  try {
    await axios.put(`${BASE_URL}/${END_POINT.LINES}/${lineId}`, updatedLine);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestAddSection = async (BASE_URL: string, lineId: Line['id'], newSection: unknown) => {
  try {
    await axios.post(`${BASE_URL}/${END_POINT.LINES}/${lineId}/sections`, newSection);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestDeleteSection = async (
  BASE_URL: string,
  lineId: Line['id'],
  stationId: Station['id'],
) => {
  try {
    await axios.delete(`${BASE_URL}/${END_POINT.LINES}/${lineId}/sections?stationId=${stationId}`);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

export {
  requestGetLines,
  requestGetLine,
  requestAddLine,
  requestDeleteLine,
  requestEditLine,
  requestAddSection,
  requestDeleteSection,
};
