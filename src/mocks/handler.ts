import { API_URL } from '../constants/API';
import { mockToken } from './mockData';
import myData from '../../db.json';
import { rest } from 'msw';

const { stations, lines } = myData;

const loginHandlers = [
  rest.post(`${API_URL.MUNGTO}/login/token`, (req, res, ctx) => {
    return res(
      ctx.json({
        accessToken: mockToken,
      })
    );
  }),
];

const signupHandlers = [
  rest.post(`${API_URL.MUNGTO}/users`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),
];

const stationHandlers = [
  rest.get(`${API_URL.MUNGTO}/stations`, (req, res, ctx) => {
    return res(ctx.json(stations));
  }),

  rest.post(`${API_URL.MUNGTO}/stations/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(stations[0]));
  }),

  rest.delete(`${API_URL.MUNGTO}/stations/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(stations[0]));
  }),
];

const lineHandlers = [
  rest.get(`${API_URL.MUNGTO}/lines`, (req, res, ctx) => {
    return res(ctx.json(lines));
  }),

  rest.get(`${API_URL.MUNGTO}/lines/:id`, (req, res, ctx) => {
    const targetLine = lines.find(
      (line) => line.lineId === Number(req.params.id)
    );
    return res(ctx.json(targetLine));
  }),

  rest.post(`${API_URL.MUNGTO}/lines/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(lines[0]));
  }),

  rest.delete(`${API_URL.MUNGTO}/lines/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(lines[0]));
  }),
];

const sectionHandlers = [
  rest.get(`${API_URL.MUNGTO}/lines/:lineId/sections`, (req, res, ctx) => {
    const targetLine = lines.find(
      (line) => line.lineId === Number(req.params.id)
    );
    return res(ctx.json(targetLine));
  }),

  rest.post(`${API_URL.MUNGTO}/lines/:lineId/sections`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.delete(`${API_URL.MUNGTO}/lines/:lineId/sections`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const handlers = [
  ...loginHandlers,
  ...signupHandlers,
  ...stationHandlers,
  ...lineHandlers,
  ...sectionHandlers,
];
