import { rest } from 'msw';
import { stations as stationsData, lines as linesData } from './mock';

export const stationHandlers = [
  rest.get('/stations', (_, res, ctx) => {
    return res(ctx.json(stationsData));
  }),
  rest.post('/stations', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 3,
        name: '흑석역',
      }),
    );
  }),
  rest.delete('/stations/6', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 6,
        name: '신반포역',
      }),
    );
  }),
  rest.put('/stations/5', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 5,
        name: '잠실역',
      }),
    );
  }),
];

export const lineHandlers = [
  rest.get('/lines', (_, res, ctx) => {
    return res(ctx.json(linesData));
  }),
  rest.post('/lines', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 3,
        name: '2호선',
        color: '#fbbf24',
        extraFare: 200,
        stations: [
          {
            id: 1,
            name: '노량진',
          },
          {
            id: 3,
            name: '흑석역',
          },
          {
            id: 5,
            name: '구반포역',
          },
        ],
        sections: [
          {
            upStation: {
              id: 3,
              name: '흑석역',
            },
            downStation: {
              id: 5,
              name: '구반포역',
            },
            distance: 10,
          },
        ],
      }),
    );
  }),
  rest.delete('/lines/3', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 3,
        name: '2호선',
        color: '#fbbf24',
        extraFare: 200,
        stations: [
          {
            id: 1,
            name: '노량진',
          },
          {
            id: 3,
            name: '흑석역',
          },
          {
            id: 5,
            name: '구반포역',
          },
        ],
        sections: [
          {
            upStation: {
              id: 3,
              name: '흑석역',
            },
            downStation: {
              id: 5,
              name: '구반포역',
            },
            distance: 10,
          },
        ],
      }),
    );
  }),
];
