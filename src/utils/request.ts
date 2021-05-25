import axios from 'axios';

// 인비
const BASE_URL = 'https://inbi-subway.kro.kr'; 
// const BASE_URL = 'https://kimkimsubway.o-r.kr'; // 김김
// const BASE_URL = 'https://newwisdom-subway.p-e.kr'; // 로그인 실패
// const BASE_URL = 'https://subway-fare.kro.kr';// 로그인 실패

export interface IHeaders {
  [key: string]: string;
}

const request = {
  get: async (query: string, headers: IHeaders) =>
    await axios.get(`${BASE_URL}${query}`, { headers }),

  post: async <T>(query: string, headers: IHeaders, body: T) =>
    await axios.post(`${BASE_URL}${query}`, body, { headers }),

  put: async <T>(query: string, headers: IHeaders, body: T) =>
    await axios.put(`${BASE_URL}${query}`, body, { headers }),

  delete: async (query: string, headers: IHeaders) =>
    await axios.delete(`${BASE_URL}${query}`, { headers }),
};

export default request;
