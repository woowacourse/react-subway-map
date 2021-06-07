const ApiHostList = ['SOLONG', 'NABOM', 'OZ', 'KROPPLE'];

type ApiHost = typeof ApiHostList[number];

const apiHostName = localStorage.getItem('hostName') as ApiHost;

const API_HOST: ApiHost = apiHostName ?? 'SOLONG';

const BASE_URL: { [key: string]: string } = {
  // NABOM: 'https://subwaybot.kro.kr/api',
  // OZ: 'https://subwaybot.o-r.kr/api',
  // SOLONG: 'https://subwaybot.n-e.kr/api',
  // KROPPLE: 'https://subwaybot.p-e.kr/api',
  NABOM: 'https://subway-step2-server.herokuapp.com',
  OZ: 'https://subway-step2-server.herokuapp.com',
  SOLONG: 'https://subway-step2-server.herokuapp.com',
  KROPPLE: 'https://subway-step2-server.herokuapp.com',
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
    await request(`${BASE_URL[API_HOST]}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },

  checkEmailDuplicated: async (email: string) => {
    const response = await fetch(`${BASE_URL[API_HOST]}/members?email=${email}`);

    return await response.json();
  },

  login: async (data: LoginData) => {
    const response = await request(`${BASE_URL[API_HOST]}/login/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const { accessToken } = await response.json();

    return accessToken;
  },

  getUserInfo: async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    const response = await request(`${BASE_URL[API_HOST]}/members/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  },
};

export default apiRequest;
export type { SignData, LoginData };
export { API_HOST, ApiHostList, REQUEST_URL, request };
