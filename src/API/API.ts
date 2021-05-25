import axios from 'axios';

const URL = {
  WEDGE: 'https://wedge-subway.p-e.kr',
  PK: 'https://pkeugine-subway.kro.kr',
  ROKI: 'http://metro-roki.p-e.kr',
  KODA: 'https://techsubway.kro.kr',
};

const API = axios.create({
  baseURL: URL.PK,
});

export default API;
