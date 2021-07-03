const ApiHostList = ['SOLONG', 'NABOM', 'OZ', 'KROPPLE'];

type ApiHost = typeof ApiHostList[number];

const BASE_URL: { [key: string]: string } = {
  NABOM: 'https://subwaybot.kro.kr/api',
  OZ: 'https://subwaybot.o-r.kr/api',
  SOLONG: 'https://subwaybot.n-e.kr/api',
  KROPPLE: 'https://subwaybot.p-e.kr/api',
};

const apiHostName = localStorage.getItem('hostName') as ApiHost;

const API_HOST: ApiHost = apiHostName ?? 'SOLONG';

const REQUEST_URL = BASE_URL[API_HOST];

const request = async (url: string, requestConfig: RequestInit) => {
  const response = await fetch(url, requestConfig);

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response;
};

export { API_HOST, ApiHostList, REQUEST_URL, request };
