import { rest } from 'msw';
import { API_URL } from '../constants/API';
import { mockLines, mockStations, mockToken } from './mockData';

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
  rest.post(`${API_URL.MUNGTO}/members`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.set('Location', '/members/2'));
  }),
];

const stationHandlers = [
  rest.get(`${API_URL.MUNGTO}/stations`, (req, res, ctx) => {
    return res(ctx.json(mockStations));
  }),

  rest.post(`${API_URL.MUNGTO}/stations/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStations[0]));
  }),

  rest.delete(`${API_URL.MUNGTO}/stations/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStations[0]));
  }),
];

const lineHandlers = [
  rest.get(`${API_URL.MUNGTO}/lines`, (req, res, ctx) => {
    return res(ctx.json(mockLines));
  }),

  rest.get(`${API_URL.MUNGTO}/lines/:id`, (req, res, ctx) => {
    const targetLine = mockLines.find(
      (line) => line.id === Number(req.params.id)
    );
    return res(ctx.json(targetLine));
  }),

  rest.post(`${API_URL.MUNGTO}/lines/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockLines[0]));
  }),

  rest.delete(`${API_URL.MUNGTO}/lines/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockLines[0]));
  }),
];

const sectionHandlers = [
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
