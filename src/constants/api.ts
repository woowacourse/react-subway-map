import { SERVER } from './constant';

export const API = {
  SIGN_IN: () => `${SERVER.URL}/login/token`,
  GET_STATIONS: () => `${SERVER.URL}/stations`,
  LINES: () => `${SERVER.URL}/lines`,
  SECTION: (id: number) => `${SERVER.URL}/lines/${id}/sections`,
};

export const RESPONSE = {
  SUCCESS: '요청 성공',
  FAILURE: '요청 실패',
};
