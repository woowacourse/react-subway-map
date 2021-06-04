import { store } from '..';

export const API = {
  SIGN_IN: () => {
    return `${store.getState().user.baseURL}/login/token`;
  },
  GET_STATIONS: () => `${store.getState().user.baseURL}/stations`,
  LINES: () => `${store.getState().user.baseURL}/lines`,
  SECTION: (id: number) => `${store.getState().user.baseURL}/lines/${id}/sections`,
};

export const RESPONSE = {
  SUCCESS: '요청 성공',
  FAILURE: '요청 실패',
};
