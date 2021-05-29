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

export const STATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 20,
};

export const LINE = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 20,
};

export const SECTION = {
  DISTANCE: 1,
};

export const AUTH = {
  PASSWORD_MIN_LENGTH: 4,
  PASSWORD_MAX_LENGTH: 20,
  AGE_MIN: 1,
  AGE_MAX: 200,
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
      REGISTERED_LINE_STATION: '노선에 등록된 역은 삭제가 불가능합니다.',
      INVALID_STATION_LENGTH: `역 이름은 최소 ${STATION.NAME_MIN_LENGTH}글자 이상 ${STATION.NAME_MAX_LENGTH}글자 이하여야 합니다.`,
      NOT_KOREAN_AND_NUMBER: '역 이름은 한글과 숫자만 입력할 수 있습니다.',
      REGISTERED_STATION: '이미 존재하는 역 이름입니다.',
    },
    LINE: {
      LOAD_FAILED: '노선 정보를 불러오는데 실패했습니다...!',
      ADD_FAILED: '노선을 추가하는데 실패했습니다...!',
      DELETE_FAILED: '노선을 삭제하는데 실패했습니다...!',
      INVALID_NAME_LENGTH: '노선 이름은 최소 2글자 이상 20글자 이하여야 합니다.',
      NOT_KOREAN_AND_NUMBER: '노선 이름은 한글과 숫자만 입력할 수 있습니다.',
      REGISTERED_LINE: '이미 존재하는 노선 이름입니다.',
      CHOOSE_LINE: '구간을 생성할 노선을 선택해주세요.',
      CHOOSE_LINE_FIRST: '노선을 먼저 선택해주세요.',
      CHOOSE_STATIONS: '상행역과 하행역을 모두 선택해주세요.',
      SAME_STATIONS: '상행 종점역과 하행 종점역은 동일할 수 없습니다.',
      SHOULD_ONLY_ONE_STATION_REGISTERED: '상행역과 하행역 둘 중에 하나의 역만 기존 노선에 등록되어 있어야합니다.',
    },
    SECTION: {
      LOAD_FAILED: '구간 정보를 불러오는데 실패했습니다...!',
      ADD_FAILED: '구간을 추가하는데 실패했습니다...!',
      DELETE_FAILED: '구간을 삭제하는데 실패했습니다...!',
      SHOULD_CHOOSE_STATION: '상행 종점역과 하행 종점역을 선택해주세요.',
      SAME_STATIONS: '상행 종점역과 하행 종점역은 동일할 수 없습니다.',
      DISTANCE_NOT_A_NUMBER: '노선의 거리는 숫자여야 합니다.',
      INVALID_DISTANCE: `노선의 거리는 최소 ${SECTION.DISTANCE}km 이상이여야 합니다.`,
      SHOULD_CHOOSE_COLOR: '노선 색상을 선택해주세요.',
      REGISTERED_COLOR: '이미 노선에 등록된 색상입니다.\n다른 색상을 선택해주세요.',
      SHOULD_SMALLER_DISTANCE: '해당 구역의 거리보다 긴 거리를 등록할 순 없습니다.',
    },
    AUTH: {
      INVALID_EMAIL: '이메일 형식이 아닙니다.',
      INVALID_PASSWORD_LENGTH: `비밀번호는 최소 ${AUTH.PASSWORD_MIN_LENGTH}글자 이상 ${AUTH.PASSWORD_MAX_LENGTH}글자 이하여야 합니다.`,
      INVALID_AGE: '나이는 숫자여야 합니다.',
      INVALID_AGE_LENGTH: `나이는 ${AUTH.AGE_MIN}살 이상 ${AUTH.AGE_MAX}살 이하여야 합니다.`,
      NOT_SAME_PASSWORD: '동일한 비밀번호를 입력해주세요.',
    },
  },
  SUCCESS: {
    RESPONSE: '요청에 성공했습니다.',
    SIGN_UP: '회원가입에 성공하였습니다!',
  },
};
