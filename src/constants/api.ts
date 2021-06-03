const BASE_URL = {
  STATION: (host: string) => `${host}/stations`,
  LINE: (host: string) => `${host}/lines`,
  ME: (host: string) => `${host}/members/me`,
  SIGNUP: (host: string) => `${host}/members`,
  LOGIN: (host: string) => `${host}/login/token`,
  PATH: (host: string, departStationId: number, destStationId: number) =>
    `${host}/paths?source=${departStationId}&target=${destStationId}&type=DISTANCE`,
};

export default BASE_URL;
