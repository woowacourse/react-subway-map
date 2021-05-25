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
    themeColor: PALETTE.BLUE,
  },
  JOEl: {
    name: '조엘',
    endPoint: 'https://joel-subway.kro.kr',
    themeColor: PALETTE.ORANGE,
  },
  JOAN: {
    name: '조앤',
    endPoint: 'https://anne-subway.r-e.kr ',
    themeColor: PALETTE.GREEN,
  },
  JAYON: {
    name: '제이온',
    endPoint: 'https://jayon-subway.r-e.kr',
    themeColor: PALETTE.PINK,
  },
  MOCK: {
    name: 'JSON',
    endPoint: 'http://localhost:3000',
    themeColor: PALETTE.RED,
  },
};
