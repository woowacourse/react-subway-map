import { rest } from 'msw';
import { URL } from '../constants/API';
import { mockLines, mockStations, mockToken } from './mockData';

export const handlers = [
  rest.post(`${URL.MUNGTO}/login/token`, (req, res, ctx) => {
    return res(
      ctx.json({
        accessToken: mockToken,
      })
    );
  }),

  rest.post(`${URL.MUNGTO}/members`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.set('Location', '/members/2'));
  }),

  rest.get(`${URL.MUNGTO}/stations`, (req, res, ctx) => {
    return res(ctx.json(mockStations));
  }),

  rest.get(`${URL.MUNGTO}/lines`, (req, res, ctx) => {
    return res(ctx.json(mockLines));
  }),

  rest.post(`${URL.MUNGTO}/stations/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStations[0]));
  }),

  rest.delete(`${URL.MUNGTO}/stations/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStations[0]));
  }),
];
