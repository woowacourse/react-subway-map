const BASE_URL = 'https://ecsimsw.n-e.kr';

const END_POINT = {
  STATIONS: '/stations',
  LINES: '/lines',
  AUTH: '/members',
  LOGIN: '/login/token',
};

const API_STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
};

export { BASE_URL, END_POINT, API_STATUS };
