import ERROR_TYPE from './constants/errorType';
import { ERROR_MESSAGE } from './constants/messages';
import STATUS_CODE from './constants/statusCode';

const ApiHostList = ['SOLONG', 'NABOM', 'OZ', 'KROPPLE'];

type ApiHost = typeof ApiHostList[number];

const apiHostName = localStorage.getItem('hostName') as ApiHost;

const API_HOST: ApiHost = apiHostName ?? 'SOLONG';

const BASE_URL: { [key: string]: string } = {
  NABOM: 'https://subwaybot.kro.kr/api',
  OZ: 'https://subwaybot.o-r.kr/api',
  SOLONG: 'https://subwaybot.n-e.kr/api',
  KROPPLE: 'https://subwaybot.p-e.kr/api',
};

const REQUEST_URL = BASE_URL[API_HOST];

interface SignData {
  email: string;
  age: number;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const request = async (url: string, requestConfig: RequestInit) => {
  const response = await fetch(url, requestConfig);

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response;
};

const apiRequest = {
  signup: async (data: SignData) => {
    try {
      await request(`${BASE_URL[API_HOST]}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return { ok: true };
    } catch (error) {
      return { ok: false, error: { type: ERROR_TYPE.DEFAULT, message: ERROR_MESSAGE.DEFAULT } };
    }
  },

  checkEmailDuplicated: async (email: string) => {
    try {
      const response = await fetch(`${BASE_URL[API_HOST]}/members?email=${email}`);
      const isDuplicated = await response.json();

      if (isDuplicated) {
        return { ok: true, data: true };
      }

      return { ok: true, data: false };
    } catch (error) {
      return { ok: false, error: { type: ERROR_TYPE.DEFAULT, message: ERROR_MESSAGE.DEFAULT } };
    }
  },

  login: async (data: LoginData) => {
    try {
      const response = await request(`${BASE_URL[API_HOST]}/login/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const { accessToken } = await response.json();

      return { ok: true, data: accessToken };
    } catch (error) {
      if (error.message === STATUS_CODE.BAD_REQUEST) {
        return {
          ok: false,
          error: { type: ERROR_TYPE.INVALID_LOGIN_INFO, message: ERROR_MESSAGE.LOGIN },
        };
      }
      return { ok: false, error: { type: ERROR_TYPE.DEFAULT, message: ERROR_MESSAGE.DEFAULT } };
    }
  },

  getUserInfo: async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return { ok: false, error: { type: ERROR_TYPE.NO_ACCESS_TOKEN, message: '' } };
    }

    try {
      const response = await request(`${BASE_URL[API_HOST]}/members/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const json = await response.json();
      return { ok: true, data: json };
    } catch (error) {
      return { ok: false, error: { type: ERROR_TYPE.DEFAULT, message: ERROR_MESSAGE.DEFAULT } };
    }
  },
};

export default apiRequest;
export type { SignData, LoginData };
export { API_HOST, ApiHostList, REQUEST_URL, request };
