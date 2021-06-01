import { rest } from 'msw';
import { URL } from '../constants/API';
import { mockToken } from './mockData';

export const handlers = [
  rest.post(`${URL.MUNGTO}/login/token`, (req, res, ctx) => {
    console.log('mock: POST /login/token');

    return res(
      ctx.json({
        accessToken: mockToken,
      })
    );
  }),
  rest.post(`${URL.MUNGTO}/members`, (req, res, ctx) => {
    console.log('mock: POST /members');

    return res(ctx.status(201), ctx.set('Location', '/members/2'));
  }),
];
