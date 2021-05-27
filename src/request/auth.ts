import axios from 'axios';
import { API_STATUS, END_POINT } from 'constants/api';

const requestCheckDuplicatedEmail = async (BASE_URL: string, email: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${END_POINT.AUTH}/exists/${email}`);

    return { status: API_STATUS.FULFILLED, data: response.data };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED };
  }
};

const requestSignup = async (
  BASE_URL: string,
  signupData: {
    email: string;
    password: string;
    age: number;
  },
) => {
  try {
    await axios.post(`${BASE_URL}/${END_POINT.AUTH}`, signupData);

    return { status: API_STATUS.FULFILLED };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

const requestLogin = async (BASE_URL: string, loginData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/${END_POINT.LOGIN}`, loginData);

    return { status: API_STATUS.FULFILLED, data: response.data };
  } catch (error) {
    console.error(error);

    return { status: API_STATUS.REJECTED, message: error.response.data.message };
  }
};

export { requestCheckDuplicatedEmail, requestSignup, requestLogin };
