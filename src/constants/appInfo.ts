import { PageInfo } from './../types';
import { Palette } from './palette';

export const APP_TITLE = 'SUNKIST';

export const PAGE_INFO: Record<string, PageInfo> = {
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
  FULL_MAP: {
    text: '전체 보기',
    path: '/full-map',
  },
};

export const COMMON_NAV_LIST = [PAGE_INFO.STATIONS, PAGE_INFO.LINES, PAGE_INFO.SECTIONS];

export const THEME_COLOR: Palette = Palette.YELLOW_400;

export const LINE_COLORS: Palette[] = [
  Palette.RED_400,
  Palette.ORANGE_400,
  Palette.YELLOW_400,
  Palette.GREEN_400,
  Palette.LIME_400,
  Palette.BLUE_400,
  Palette.INDIGO_400,
  Palette.PURPLE_400,
  Palette.PINK_400,
  Palette.CYAN_400,
];

export const HOME = {
  API_SELECT_GROUP: 'api',
};

export const STATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 10,
};

export const LINE = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 10,
  COLOR_SELECT_GROUP: 'lineColor',
};

export const MIN_DISTANCE = 1;

export const SIGNUP = {
  MIN_AGE: 1,
  MAX_AGE: 150,
  PASSWORD_MIN_LENGTH: 4,
  PASSWORD_MAX_LENGTH: 20,
};
