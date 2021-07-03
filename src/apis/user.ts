import { REQUEST_URL } from './request';
import APIFetcher from './apiFetcher';

interface SignData {
  email: string;
  age: number;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface APIResponseDataToken {
  accessToken: string;
}

const API = {
  get: async () => {
    return await APIFetcher<LoginData, string>()(`${REQUEST_URL}/members/me`, 'GET');
  },
  login: async (data: LoginData) => {
    return await APIFetcher<APIResponseDataToken, string>()(
      `${REQUEST_URL}/login/token`,
      'POST',
      JSON.stringify(data)
    );
  },
  checkEmailDuplicated: async (email: string) => {
    return await APIFetcher<boolean, string>()(`${REQUEST_URL}/members?email=${email}`, 'GET');
  },
  signup: async (data: SignData) => {
    return await APIFetcher<never, string>()(
      `${REQUEST_URL}/members`,
      'POST',
      JSON.stringify(data)
    );
  },
};

export default API;
