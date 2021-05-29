import axios from 'axios';

export interface IHeaders {
  [key: string]: string;
}

const request = {
  get: async (url: string, headers: IHeaders) => await axios.get(url, { headers }),

  post: async <T>(url: string, headers: IHeaders, body: T) =>
    await axios.post(url, body, { headers }),

  put: async <T>(url: string, headers: IHeaders, body: T) =>
    await axios.put(url, body, { headers }),

  delete: async (url: string, headers: IHeaders) => await axios.delete(url, { headers }),
};

export default request;
