export const ROUTE = {
  HOME: { PATH: '/' },
  SIGN_IN: { NAME: '로그인', PATH: '/sign-in' },
  SIGN_OUT: { NAME: '로그아웃', PATH: '/sign-out' },
  SIGN_UP: { NAME: '회원가입', PATH: '/sign-up' },
  STATION_MANAGE: { NAME: '역 관리', PATH: '/station-mange' },
  LINE_MANAGE: { NAME: '노선 관리', PATH: '/line-manage' },
  SECTION_MANAGE: { NAME: '구간 관리', PATH: '/section-manage' },
};

export const COLOR = {
  RED: '#d70015',
  AMBER: '#fcca00',
  WHITE: '#ffffff',
  GRAY_100: '#eeeeee',
  GRAY_300: '#a8a4a4',
  GRAY_500: '#333333',
};

export const LINE_COLOR = {
  DEFAULT: '#DE59B9',
  PINK: '#E76E9A',
  RED: '#E24141',
  ORANGE: '#F37D3B',
  YELLOW: '#FBCD58',
  GREEN: '#73BC6D',
  CYAN: '#94DACD',
  BLUE: '#547ce4',
  NAVY: '#000080',
  PURPLE: '	#8A2BE2',
};

export const SIZE = {
  MD: 'medium',
  LG: 'large',
};

export const REG_EXP = {
  NUMBER: /^[0-9]*$/,
  EMAIL:
    /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/,
  PASSWORD:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$~!@#$%^&*()-+?])[A-Za-z\d$~!@#$%^&*()-+?]{6,20}$/,
  STATION_NAME: /^[가-힣|0-9|]{2,20}$/,
  LINE_NAME: /^[가-힣|0-9|]{2,10}$/,
};

export const RANGE = {
  AGE: {
    MIN: 0,
    MAX: 100,
  },
};

export const MOCK_SERVER = 'https://mock.api';

export const DEFAULT_SERVER = '중간곰';

export const SERVERS = {
  제리: 'https://jerry-subway.o-r.kr',
  조이: 'https://joy-subway.p-e.kr',
  중간곰: 'https://woowa-subway.kro.kr',
  와이비: 'https://whybe-subway.n-e.kr',
  영이: 'https://techcourse.p-e.kr',
};

export const LS_KEY = {
  SERVER: 'serverName',
  TOKEN: 'userToken',
};

export const ERROR = {
  UNKNOWN: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  EMAIL: {
    REQUIRED: '이메일을 입력해주세요.',
    INVALID: '올바른 이메일 형식을 입력해주세요.',
  },
  AGE: {
    REQUIRED: '나이를 입력해주세요.',
    INVALID: '올바른 나이를 입력해주세요.',
  },
  PASSWORD: {
    REQUIRED: '비밀번호를 입력해주세요.',
    INVALID: '올바른 비밀번호를 입력해주세요.',
  },
  PASSWORD_CONFIRM: {
    REQUIRED: '비밀번호를 한번 더 입력해주세요.',
    INVALID: '비밀번호가 일치하지 않습니다.',
  },
  STATION_NAME: {
    REQUIRED: '역 이름을 입력해주세요.',
    INVALID: '올바른 역 이름을 입력해주세요.',
    DUPLICATE: '중복된 역 이름은 추가할 수 없습니다.',
  },
  LINE_NAME: {
    REQUIRED: '노선 이름을 입력해주세요.',
    INVALID: '올바른 노선 이름을 입력해주세요.',
    DUPLICATE: '중복된 노선 이름은 추가할 수 없습니다.',
  },
  STATION_ID: {
    REQUIRED: '역을 선택해주세요.',
    DUPLICATE: '상행역과 하행역은 같을 수 없습니다.',
  },
  DISTANCE: {
    REQUIRED: '거리를 입력해주세요.',
    INVALID: '올바른 거리를 입력해주세요.',
  },
};

export const RESPONSE = {
  SIGN_IN: {
    FAIL: '이메일 혹은 비밀번호를 다시 확인해주세요.',
  },
  ADD_STATION: {
    SUCCESS: '새로운 역이 추가되었습니다.',
  },
  DELETE_STATION: {
    SUCCESS: '역이 삭제되었습니다.',
    FAIL: '노선에 추가된 역은 삭제할 수 없습니다.',
  },
  ADD_LINE: {
    SUCCESS: '새로운 노선이 추가되었습니다.',
  },
  DELETE_LINE: {
    SUCCESS: '노선이 삭제되었습니다.',
  },
  ADD_SECTION: {
    SUCCESS: '새로운 구간이 추가되었습니다.',
  },
  DELETE_SECTION: {
    SUCCESS: '구간이 삭제되었습니다.',
  },
};

export const INPUT_TEXT = {
  EMAIL: {
    PLACE_HOLDER: '✉️ 이메일을 입력해주세요.',
  },
  AGE: {
    PLACE_HOLDER: '👤 나이를 입력해주세요.',
  },
  PASSWORD: {
    PLACE_HOLDER: '🔒 비밀번호를 입력해주세요.',
  },
  PASSWORD_CONFIRM: {
    PLACE_HOLDER: '🔒 비밀번호를 한번 더 입력해주세요.',
  },
  STATION_NAME: {
    LABEL: '지하철 역 이름을 입력해주세요.',
    PLACE_HOLDER: '🚇 2자 ~ 20자 사이의 한글, 숫자 조합',
  },
  LINE_NAME: {
    LABEL: '노선 이름',
  },
  UP_STATION: {
    LABEL: '상행역',
  },
  DOWN_STATION: {
    LABEL: '하행역',
  },
  DISTANCE: {
    LABEL: '거리',
  },
};

export const TEST = {
  MOCK_DATA: {
    ID: 'test',
    NAME: '테스트',
  },
  ID: {
    SIGN_UP_BUTTON: 'signup-button',
    SIGN_IN_BUTTON: 'signin-button',
    STATION_ADD_BUTTON: 'station-add-button',
    LINE_ADD_BUTTON: 'line-add-button',
    SECTION_ADD_BUTTON: 'section-add-button',
  },
};
