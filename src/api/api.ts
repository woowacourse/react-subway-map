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
    await axios.post(`${url}/members`, {
      email: email,
      password: password,
      age: age,
    });

    return RESPONSE.SUCCESS;
  } catch (error) {
    console.error(error.message);
    return RESPONSE.FAILURE;
  }
};
