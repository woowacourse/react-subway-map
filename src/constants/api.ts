import PALETTE, { Color } from './palette';

interface APIInfo {
  name: string;
  endPoint: string;
  themeColor: Color;
}

export const API_INFO: { [key: string]: APIInfo } = {
  FAFI: {
    name: '파피',
    endPoint: 'https://fafi-subway.o-r.kr',
    themeColor: PALETTE.GREEN,
  },
  JOEl: {
    name: '조엘',
    endPoint: 'https://joel-subway.kro.kr',
    themeColor: PALETTE.YELLOW,
  },
  JOAN: {
    name: '조앤',
    endPoint: 'https://anne-subway.r-e.kr',
    themeColor: PALETTE.RED,
  },
  JAYON: {
    name: '제이온',
    endPoint: 'https://jayon-subway.r-e.kr',
    themeColor: PALETTE.CYAN,
  },
};

export const DEFAULT_API_OWNER = 'FAFI';
