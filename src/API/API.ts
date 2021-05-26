import axios from 'axios';

const URL = {
  WEDGE: 'https://wedge-subway.p-e.kr',
  KODA: 'https://techsubway.kro.kr',
  PK: 'https://pkeugine-subway.kro.kr',
  ROKI: 'https://metro-roki.p-e.kr',
};

const API = axios.create({
  baseURL: URL.ROKI,
});

export default API;
