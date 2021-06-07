import { rest } from 'msw';
import { stations as stationsData, lines as linesData } from './mockData';

export const stationHandlers = [
  rest.get('/stations', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(stationsData));
  }),
  rest.post('/stations', (req, res, ctx) => {
    const newStation = {
      id: 6,
      ...req.body,
    };
    stationsData.push(newStation);

    return res(ctx.status(201), ctx.json(newStation));
  }),
  rest.put('/stations/5', (req, res, ctx) => {
    stationsData.find((station) => station.id === 5).name = req.body.name;

    return res(
      ctx.status(200),
      ctx.json({
        id: 5,
        ...req.body,
      }),
    );
  }),
  rest.delete('/stations/5', (req, res, ctx) => {
    stationsData = stationsData.filter((station) => station.id !== 5);

    return res(ctx.status(204));
  }),
];

export const lineHandlers = [
  rest.get('/lines', (_, res, ctx) => {
    return res(cts.status(200), ctx.json(linesData));
  }),
  rest.post('/lines', (req, res, ctx) => {
    const newLine = {
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
    };

    linesData.push(newLine);

    return res(ctx.status(201), ctx.json(newLine));
  }),
  rest.delete('/lines/3', (_, res, ctx) => {
    linesData = linesData.filter((line) => line.id !== 5);

    return res(ctx.status(204));
  }),
];
