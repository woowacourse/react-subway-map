import ERROR_TYPE from '../constants/errorType';
import { request } from './request';

interface APISuccess<T> {
  ok: true;
  data: T;
}

interface APIFailure<T extends string> {
  ok: false;
  error: { type: T; message: T };
}

const APIFetcher =
  <S, F extends string>() =>
  async <SW extends APISuccess<S>, FW extends APIFailure<F>>(
    uri: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    data?: BodyInit
  ): Promise<SW | FW> => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const requestConfig = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: data ?? null,
      };
      const response = await request(`${uri}`, requestConfig);

      try {
        const json: S = await response.json();

        return { ok: true, data: json } as SW;
      } catch (error) {
        return { ok: true, data: {} } as SW;
      }
    } catch (error) {
      return {
        ok: false,
        error: {
          type: ERROR_TYPE[error.message],
          message: '',
        },
      } as FW;
    }
  };

export default APIFetcher;
