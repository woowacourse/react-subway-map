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

interface SignData {
  email: string;
  age: number;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface StationData {
  name: string;
}

interface LineData {
  name: string;
  color: string;
  upStationId: number;
  downStationId: number;
  distance: number;
}

interface SectionData {
  upStationId: number;
  downStationId: number;
  distance: number;
}

interface APIReturnTypeStation {
  id: number;
  name: string;
}

interface APIReturnTypeSection {
  id: number;
  upStation: APIReturnTypeStation;
  downStation: APIReturnTypeStation;
  distance: number;
}

interface APIReturnTypeLine {
  id: number;
  name: string;
  color: string;
  sections: APIReturnTypeSection[];
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

  getStations: async (): Promise<APIReturnTypeStation[]> => {
    const response = await request(`${BASE_URL[API_HOST]}/stations`, {
      method: 'GET',
    });

    return await response.json();
  },

  addStation: async (data: StationData): Promise<APIReturnTypeStation | undefined> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }

    const response = await request(`${BASE_URL[API_HOST]}/stations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },

  deleteStation: async (stationId: number) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    const response = await request(`${BASE_URL[API_HOST]}/stations/${stationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getLine: async (lineId: number): Promise<APIReturnTypeLine> => {
    const response = await request(`${BASE_URL[API_HOST]}/lines/${lineId}`, {
      method: 'GET',
    });

    return await response.json();
  },

  getLines: async (): Promise<APIReturnTypeLine[]> => {
    const response = await request(`${BASE_URL[API_HOST]}/lines`, {
      method: 'GET',
    });

    return await response.json();
  },

  addLine: async (data: LineData): Promise<APIReturnTypeLine | undefined> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    const response = await request(`${BASE_URL[API_HOST]}/lines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },

  deleteLine: async (lineId: number) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    await request(`${BASE_URL[API_HOST]}/lines/${lineId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  addSection: async (lineId: number, data: SectionData) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    await request(`${BASE_URL[API_HOST]}/lines/${lineId}/sections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  },

  deleteSection: async (lineId: number, stationId: number) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    await request(`${BASE_URL[API_HOST]}/lines/${lineId}/sections?stationId=${stationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default apiRequest;
export type { SignData, LoginData, APIReturnTypeStation, APIReturnTypeLine };
export { API_HOST, ApiHostList };
