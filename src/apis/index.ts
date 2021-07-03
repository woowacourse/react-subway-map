import axios from 'axios';

import { API_HOST } from '../constants/storage';
import user from './user';
import station from './station';
import line from './line';
import section from './section';

const URL_TABLE: { [key: string]: string } = {
  NABOM: 'https://subwaybot.kro.kr/api',
  OZ: 'https://subwaybot.o-r.kr/api',
  SOLONG: 'https://subwaybot.n-e.kr/api',
  KROPPLE: 'https://subwaybot.p-e.kr/api',
};

axios.defaults.baseURL = URL_TABLE[API_HOST];
axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = {
  user,
  station,
  line,
  section,
};

export default api;
