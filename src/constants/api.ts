import { SERVER } from './constant';

export const API = {
  SIGN_IN: () => `${SERVER.URL}/login/token`,
  GET_STATIONS: () => `${SERVER.URL}/stations`,
  LINES: () => `${SERVER.URL}/lines`,
  SECTION: (id: number) => `${SERVER.URL}/lines/${id}/sections`,
};
