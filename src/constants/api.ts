const BASE_URL = {
  STATION: (host: string) => `${host}/stations`,
  LINE: (host: string) => `${host}/lines`,
  ME: (host: string) => `${host}/members/me`,
  LOGIN: (host: string) => `${host}/login/token`,
};

export default BASE_URL;
