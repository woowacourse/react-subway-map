import axios from 'axios';
import { API_STATUS, BASE_URL, END_POINT } from 'constants/api';

export const requestSignup = async (signupData: {
  email: string;
  password: string;
  age: number;
}) => {
  try {
    await axios.post(`${BASE_URL}/${END_POINT.AUTH}`, signupData);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

export const requestLogin = async (loginData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/${END_POINT.LOGIN}`, loginData);

    return { status: API_STATUS.FULFILLED, data: response.data };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};
