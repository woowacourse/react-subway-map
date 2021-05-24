import { SERVER } from './constant';

export const API = {
  SIGN_IN: () => `${SERVER.URL}/login/token`,
};

export const RESPONSE = {
  SUCCESS: '요청 성공',
  FAILURE: '요청 실패',
};
