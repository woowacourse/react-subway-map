import { rest } from 'msw';
import { stations as stationsData, lines as linesData } from './mock';

const CORGI_URL = 'https://ecsimsw.n-e.kr';

export const stationHandlers = [
  rest.get('/stations', (_, res, ctx) => {
    console.log('get working');

    return res(ctx.status(200), ctx.json(stationsData));
  }),
  rest.post('/stations', (req, res, ctx) => {
    console.log('post working');

    const newStation = {
      id: 6,
      ...req.body,
    };
    stationsData.push(newStation); // 억지

    return res(ctx.status(201), ctx.json(newStation));
  }),
  // 1. req.params에 문제가 있다?
  // 2. mock server 연결하는 쪽의 sync
  rest.put('/stations/5', (req, res, ctx) => {
    stationsData.find((station) => station.id === 5).name = req.body.name;
    console.log('update working');

    return res(
      ctx.status(200),
      ctx.json({
        id: 5,
        ...req.body,
      }),
    );
  }),
  rest.delete('/stations/:id', (req, res, ctx) => {
    console.log('delete working');
    stationsData = stationsData.filter((station) => station.id !== req.params.id);

    return res(
      ctx.status(204),
      ctx.json({
        id: Number(req.params.id),
        ...req.body,
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
