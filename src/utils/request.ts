import axios from 'axios';

const BASE_URL = 'https://inbi-subway.kro.kr';

export interface IHeaders {
  [key: string]: string;
}

const request = {
  get: async (query: string, headers: IHeaders) =>
    (await axios.get(`${BASE_URL}${query}`, { headers })).data,

  post: async <T>(query: string, headers: IHeaders, body: T) =>
    (await axios.post(`${BASE_URL}${query}`, body, { headers })).data,

  put: async <T>(query: string, headers: IHeaders, body: T) =>
    await axios.put(`${BASE_URL}${query}`, body, { headers }),

  delete: async (query: string, headers: IHeaders) =>
    await axios.delete(`${BASE_URL}${query}`, { headers }),
};

export default request;
