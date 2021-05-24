import axios from 'axios';
import { API, RESPONSE } from '../constants/api';

interface SignUp {
  url: string;
  email: string;
  password: string;
  age: string;
}

export const signUp = async ({ url, email, password, age }: SignUp) => {
  try {
    const data = {
      email: email,
      password: password,
      age: age,
    };
    await axios.post(`${url}/members`, data);

    return RESPONSE.SUCCESS;
  } catch (error) {
    console.error(error.message);
    return RESPONSE.FAILURE;
  }
};

interface SignIn {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignIn) => {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response: { accessToken: string } = await axios.post(API.SIGN_IN(), data);
    return response.accessToken;
  } catch (error) {
    return RESPONSE.FAILURE;
  }
};
