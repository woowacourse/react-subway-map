import axios from 'axios';
import { API_STATUS, BASE_URL, END_POINT } from 'constants/api';
import { Line, Station } from 'types';

const requestGetLines = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/${END_POINT.LINES}`);

    return { status: API_STATUS.FULFILLED, data: response.data };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestGetLine = async (lineId: Line['id']) => {
  try {
    const response = await axios.get(`${BASE_URL}/${END_POINT.LINES}/${lineId}`);

    return { status: API_STATUS.FULFILLED, data: response.data };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestDeleteLine = async (lineId: Line['id']) => {
  try {
    await axios.delete(`${BASE_URL}/${END_POINT.LINES}/${lineId}`);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestAddLine = async (newLine: unknown) => {
  try {
    await axios.post(`${BASE_URL}/${END_POINT.LINES}`, newLine);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestEditLine = async (lineId: Line['id'], updatedLine: unknown) => {
  try {
    await axios.put(`${BASE_URL}/${END_POINT.LINES}/${lineId}`, updatedLine);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestAddSection = async (lineId: Line['id'], newSection: unknown) => {
  try {
    await axios.post(`${BASE_URL}/${END_POINT.LINES}/${lineId}/sections`, newSection);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestDeleteSection = async (lineId: Line['id'], stationId: Station['id']) => {
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
