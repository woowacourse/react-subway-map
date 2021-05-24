const BASE_URL = {
  NABOM: 'https://subwaybot.kro.kr/api',
  OZ: 'https://subwaybot.o-r.kr/api',
  SOLONG: 'https://subwaybot.n-e.kr/api',
  KROPPLE: 'https://subwaybot.p-e.kr/api',
};

interface SignData {
  email: string;
  age: number;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const API_HOST = 'NABOM';

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
};

export default apiRequest;
export type { SignData, LoginData };
