type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const URL = {
  BETTER: 'https://subway-fare-mission.kro.kr/stations',
  KEVIN: 'https://jipark.p-e.kr/',
  MUNGTO: 'https://mungto-subway.o-r.kr',
  PIKA: 'https://pika-subway-fare.kro.kr',
};

const BASE_URL = URL.PIKA;

const fetchOption = (
  method: HTTPMethod,
  { payload, token }: { payload?: unknown; token?: string } = {}
) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: payload ? JSON.stringify(payload) : null,
  Authorization: token ? `Bearer ${token}` : null,
});

const APIClient = {
  get(path: string, token?: string) {
    return fetch(BASE_URL + path, fetchOption('GET', { token }));
  },
  post(path: string, payload: unknown, token?: string) {
    return fetch(BASE_URL + path, fetchOption('POST', { payload, token }));
  },
  delete(path: string, token?: string) {
    return fetch(BASE_URL + path, fetchOption('DELETE', { token }));
  },
  put(path: string, payload: unknown, token?: string) {
    return fetch(BASE_URL + path, fetchOption('PUT', { payload, token }));
  },
  patch(path: string, payload: unknown, token?: string) {
    return fetch(BASE_URL + path, fetchOption('PATCH', { payload, token }));
  },
};

export default APIClient;

// const fetchOption = ({ body, token }) => {};
