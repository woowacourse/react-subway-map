const ApiHostList = ['SOLONG', 'NABOM', 'OZ', 'KROPPLE'] as const;
type ApiHost = typeof ApiHostList[number];

const KEY = {
  HOST_NAME: 'hostName',
  ACCESS_TOKEN: 'accessToken',
};

const API_HOST: ApiHost = (() => {
  const stored = localStorage.getItem(KEY.HOST_NAME);

  if (!ApiHostList.some((name) => name === stored)) {
    return 'SOLONG';
  }

  return stored as ApiHost;
})();

const ACCESS_TOKEN = localStorage.getItem(KEY.ACCESS_TOKEN) ?? null;

export { ApiHostList, API_HOST, ACCESS_TOKEN };
