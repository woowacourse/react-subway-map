import { Page } from './../types';
import PALETTE from './palette';

export const APP_TITLE = 'RUNNINGMAP';

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

export const THEME_COLOR = PALETTE.YELLOW;
