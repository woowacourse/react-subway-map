import { Palette } from './palette';

export enum APIOwnerType {
  FAFI = 'FAFI',
  JOEL = 'JOEL',
  JOAN = 'JOAN',
  JAYON = 'JAYON',
}

export interface APIInfo {
  name: string;
  endPoint: string;
  themeColor: Palette;
}

export const DEFAULT_API_OWNER = APIOwnerType.JOAN;

export const API_INFO: Record<APIOwnerType, APIInfo> = {
  FAFI: {
    name: '파피',
    endPoint: 'https://fafi-subway.o-r.kr',
    themeColor: Palette.GREEN_400,
  },
  JOEL: {
    name: '조엘',
    endPoint: 'http://3.35.9.119/',
    themeColor: Palette.YELLOW_400,
  },
  JOAN: {
    name: '조앤',
    endPoint: 'https://anne-subway.r-e.kr',
    themeColor: Palette.RED_400,
  },
  JAYON: {
    name: '제이온',
    endPoint: 'https://jayon-subway.r-e.kr',
    themeColor: Palette.CYAN_400,
  },
};
