const ApiHostList = ['SOLONG', 'NABOM', 'OZ', 'KROPPLE'] as const;
type ApiHost = typeof ApiHostList[number];

const STORAGE_KEY = {
  HOST_NAME: 'hostName',
  ACCESS_TOKEN: 'accessToken',
};

const API_HOST: ApiHost = (() => {
  const stored = localStorage.getItem(STORAGE_KEY.HOST_NAME);

  if (!ApiHostList.some((name) => name === stored)) {
    return 'SOLONG';
  }

  return stored as ApiHost;
})();

const getAccessToken = () => localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN) ?? null;

export { STORAGE_KEY, ApiHostList, API_HOST, getAccessToken };
