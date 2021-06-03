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
  PATHS: 'paths',
  AUTH: 'members',
  LOGIN: 'login/token',
};

enum API_STATUS {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

export { SERVER, KOREAN_SERVER, END_POINT, API_STATUS };
