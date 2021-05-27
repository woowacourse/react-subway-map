type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const currentAPI = {
  baseUrl: '',
};

const fetchOption = (
  method: HTTPMethod,
  { payload, token }: { payload?: unknown; token?: string } = {}
) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  },
  body: payload ? JSON.stringify(payload) : null,
});

const APIClient = {
  get(path: string, token?: string) {
    return fetch(currentAPI.baseUrl + path, fetchOption('GET', { token }));
  },
  post(path: string, payload: unknown, token?: string) {
    return fetch(
      currentAPI.baseUrl + path,
      fetchOption('POST', { payload, token })
    );
  },
  delete(path: string, token?: string) {
    return fetch(currentAPI.baseUrl + path, fetchOption('DELETE', { token }));
  },
  put(path: string, payload: unknown, token?: string) {
    return fetch(
      currentAPI.baseUrl + path,
      fetchOption('PUT', { payload, token })
    );
  },
  patch(path: string, payload: unknown, token?: string) {
    return fetch(
      currentAPI.baseUrl + path,
      fetchOption('PATCH', { payload, token })
    );
  },
};

export default APIClient;
