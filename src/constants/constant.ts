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

export const MESSAGE = {
  ERROR: {
    RESPONSE: '요청에 실패했습니다.',
    REGISTERED_EMAIL: '이미 가입된 이메일입니다.',
    REGISTER_FAILED: '회원가입에 실패하였습니다.',
    LOGIN_FAILED: '로그인에 실패하였습니다.',
    STATION: {
      LOAD_FAILED: '역 정보를 불러오는데 실패했습니다...!',
      ADD_FAILED: '역을 추가하는데 실패했습니다...!',
      DELETE_FAILED: '역을 삭제하는데 실패했습니다...!',
      REGISTERED_STATION: '노선에 등록된 역은 삭제가 불가능합니다.',
    },
    LINE: {
      LOAD_FAILED: '노선 정보를 불러오는데 실패했습니다...!',
      ADD_FAILED: '노선을 추가하는데 실패했습니다...!',
      DELETE_FAILED: '노선을 삭제하는데 실패했습니다...!',
    },
    SECTION: {
      LOAD_FAILED: '구간 정보를 불러오는데 실패했습니다...!',
      ADD_FAILED: '구간을 추가하는데 실패했습니다...!',
      DELETE_FAILED: '구간을 삭제하는데 실패했습니다...!',
    },
  },
  SUCCESS: {
    RESPONSE: '요청에 성공했습니다.',
  },
};
