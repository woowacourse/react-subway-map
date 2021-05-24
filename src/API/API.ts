type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const BASE_URL = 'https://jipark.p-e.kr/';

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

// https://pika-subway-fare.kro.kr/
// https://mungto-subway.o-r.kr/
// https://subway-fare-mission.kro.kr/stations
// https://jipark.p-e.kr/
