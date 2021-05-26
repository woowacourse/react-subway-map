import { CREWS } from '../types';

const BACKEND = {
  [CREWS.DANYEE]: {
    name: '다니',
    baseUrl: 'https://da-nyee-subway-fare.kro.kr/api',
  },
  [CREWS.MARK]: {
    name: '마크',
    baseUrl: 'https://binghe819-subway.p-e.kr/api',
  },
  [CREWS.CHARLIE]: {
    name: '찰리',
    baseUrl: 'https://woowasubway.kro.kr/api',
  },
  [CREWS.YORN]: {
    name: '욘',
    baseUrl: 'https://metro.r-e.kr/api',
  },
};

export default BACKEND;
