export const ROUTE = {
  HOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  STATION: '/station',
  LINE: '/line',
  SECTION: '/section',
};

export const BASE_URL = {
  ROOT: { name: '루트', URL: 'https://junroot.kro.kr' },
  CHUNSIK: { name: '춘식', URL: 'https://choonsik.n-e.kr' },
  SAKJEONG: { name: '삭정', URL: 'https://sakjung-subway.kro.kr' },
  SONNEOJAL: { name: '손너잘', URL: 'https://bperhaps.p-e.kr' },
};

export const SERVER = {
  URL: '',
};

export const VALIDATION = {
  EMPTY_INPUT: ' ',
  MIN_AGE: 1,
  MAX_AGE: 200,
  MIN_DISTANCE: 1,
  MIN_PASSWORD_LENGTH: 4,
  MAX_PASSWORD_LENGTH: 20,
  MIN_STATION_NAME_LENGTH: 2,
  MAX_STATION_NAME_LENGTH: 20,
  MIN_LINE_NAME_LENGTH: 2,
  MAX_LINE_NAME_LENGTH: 10,
};
