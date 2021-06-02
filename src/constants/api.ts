const SERVER: { [key: string]: string } = {
  CORGI: 'https://ecsimsw.n-e.kr',
  WANTAE: 'https://wannte.n-e.kr',
  ARON: 'https://aaron-subway.p-e.kr',
  SEED: 'https://woowa.seedtech.p-e.kr',
  ALLI: 'https://subway.alli.r-e.kr',
};

const KOREAN_SERVER: { [key: string]: string } = {
  CORGI: '코기',
  WANTAE: '완태',
  ARON: '아론',
  SEED: '시드',
  ALLI: '알리',
};

const END_POINT = {
  STATIONS: 'stations',
  LINES: 'lines',
  AUTH: 'members',
  LOGIN: 'login/token',
};

enum RESPONSE_STATE {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

enum API_METHOD {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export { SERVER, KOREAN_SERVER, END_POINT, RESPONSE_STATE, API_METHOD };
