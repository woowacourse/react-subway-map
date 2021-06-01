import { rest } from 'msw';
import { URL } from '../constants/API';
import { mockToken } from './mockData';

export const handlers = [
  rest.post(`${URL.MUNGTO}/login/token`, (req, res, ctx) => {
    return res(
      ctx.json({
        accessToken: mockToken,
      })
    );
  }),
];
