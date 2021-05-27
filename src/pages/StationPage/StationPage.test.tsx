import '@testing-library/jest-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import StationPage from './StationPage';

const BASE_URL = 'https://subwaybot.n-e.kr';
const stations = [
  {
    id: 1,
    name: '잠실역',
  },
  {
    id: 2,
    name: '잠실새내역',
  },
  {
    id: 3,
    name: '종합운동장역',
  },
  {
    id: 4,
    name: '삼성역',
  },
  {
    id: 5,
    name: '선릉역',
  },
];
const VALID_STATION_NAME = '피터역';

describe('사용자는 지하철 역 관리 기능을 이용할 수 있다.', () => {
  const server = setupServer(
    rest.get(`${BASE_URL}/api/stations`, (req, res, ctx) => {
      return res(ctx.json(stations));
    }),
    rest.delete(`${BASE_URL}/api/stations/:id`, (req, res, ctx) => {
      return res(ctx.status(201));
    })
  );

  beforeEach(() => {
    localStorage.setItem(
      'accessToken',
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjIyMDMzMjkxLCJleHAiOjE2MjIwMzY4OTF9.-M7TyMMvXk-y5-kIoPP4crTt6Nnvv8ubREKKZjO5d7A'
    );

    render(
      <Router>
        <Route exact path="/stations">
          <StationPage setIsLoading={() => {}} />
        </Route>
        <Redirect to="/stations" />
      </Router>
    );
  });

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('사용자는 등록되어 있는 전체 지하철 역 목록을 조회할 수 있다.', async () => {
    const stationList = await waitFor(() => screen.getByLabelText('역 목록'));

    stations.forEach(async (station) => {
      await waitFor(() => within(stationList).getByText(station.name));
    });
  });

  it('등록된 지하철 역이 없는 경우, 지하철 역 없음 이미지를 보여준다.', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/stations`, (req, res, ctx) => {
        return res.once(ctx.json([]));
      })
    );

    render(
      <Router>
        <StationPage setIsLoading={() => {}} />
      </Router>
    );

    await waitFor(() => screen.getByAltText('지하철 역 없음 이미지'));
  });
});
