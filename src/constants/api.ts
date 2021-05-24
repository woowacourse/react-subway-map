import PALETTE, { Color } from './palette';

interface APIInfo {
  name: string;
  endPoint: string;
  themeColor: Color;
}

export const API_INFO = {
  FAFI: {
    name: '파피',
    endPoint: 'https://fafi-subway.o-r.kr',
    themeColor: PALETTE.BLUE,
  },
  JOEl: {
    name: '조엘',
    endPoint: 'https://joel-subway.kro.kr',
    themeColor: PALETTE.PINK,
  },
  JOAN: {
    name: '조앤',
    endPoint: 'https://anne-subway.r-e.kr ',
    themeColor: PALETTE.LIME,
  },
  JAYON: {
    name: '제이온',
    endPoint: 'https://jayon-subway.r-e.kr',
    themeColor: PALETTE.PURPLE,
  },
};
