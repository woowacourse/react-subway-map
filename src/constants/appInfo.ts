import { Page } from './../types';
import PALETTE, { Color } from './palette';

export const APP_TITLE = 'SUNKIST';

export const PAGE_INFO: { [key: string]: Page } = {
  HOME: {
    text: 'API 선택',
    path: '/',
  },
  LOGIN: {
    text: '로그인',
    path: '/login',
  },
  SIGN_UP: {
    text: '회원가입',
    path: '/signup',
  },
  STATIONS: {
    text: '역 관리',
    path: '/stations',
  },
  LINES: {
    text: '노선 관리',
    path: '/lines',
  },
  SECTIONS: {
    text: '구간 관리',
    path: '/sections',
  },
};

export const COMMON_NAV_LIST = [PAGE_INFO.STATIONS, PAGE_INFO.LINES, PAGE_INFO.SECTIONS];

export const THEME_COLOR: Color = PALETTE.YELLOW;

export const LINE_COLORS: string[] = [
  PALETTE.RED[400],
  PALETTE.ORANGE[400],
  PALETTE.YELLOW[400],
  PALETTE.GREEN[400],
  PALETTE.LIME[400],
  PALETTE.BLUE[400],
  PALETTE.INDIGO[400],
  PALETTE.PURPLE[400],
  PALETTE.PINK[400],
  PALETTE.CYAN[400],
];

export const STATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 10,
  NAME_LABEL_TEXT: '지하철 역 이름을 입력해주세요',
};

export const LINE = {
  ADD_MODAL_TITLE: '노선 추가',
  MODIFY_MODAL_TITLE: '노선 수정',
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 10,
  NAME_LABEL_TEXT: '노선 이름',
  NAME_PLACEHOLDER: '노선 이름',
  DISTANCE_LABEL_TEXT: '거리',
  COLOR_LABEL_TEXT: '노선색상',
  COLOR_SELECT_NAME: 'lineColor',
};

export const SECTION = {
  MIN_DISTANCE: 1,
  DISTANCE_LABEL_TEXT: '거리',
};

export const SIGNUP = {
  MIN_AGE: 1,
  MAX_AGE: 150,
  PASSWORD_MIN_LENGTH: 4,
  PASSWORD_MAX_LENGTH: 20,
};
