import { Page, Station } from './../types';
import PALETTE, { Color } from './palette';

export const APP_TITLE = 'SUNKIST SUBWAY';

export const PAGE_INFO: { [key: string]: Page } = {
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

export const LINE_COLORS = [
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
