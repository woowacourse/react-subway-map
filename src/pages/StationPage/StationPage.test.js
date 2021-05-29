import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor, within } from 'test-util';
import { API_STATUS } from 'constants/api';
import StationPage from '.';

const stationsData = [
  {
    id: 1,
    name: '잠실',
  },
  {
    id: 2,
    name: '경찰병원',
  },
];

const server = setupServer(
  rest.get('/stations', (_, res, ctx) => {
    return res(ctx.json(stationsData));
  }),
  rest.post('/stations', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 3,
        name: '흑석',
      }),
    );
  }),
  rest.delete('/stations/3', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 3,
        name: '흑석',
      }),
    );
  }),
  rest.put('/stations/1', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: '흑석',
      }),
    );
  }),
);

const user = {
  id: 1,
  email: 'zig1@email.com',
  age: 20,
};

const mockStore = configureStore({
  reducer: {
    authSlice: () => ({ data: user, status: API_STATUS.FULFILLED }),
    serverSlice: () => ({ server: '' }),
  },
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('StationPage 테스트', () => {
  const setup = () => {
    window.confirm = () => true;

    const utils = render(
      <Provider store={mockStore}>
        <StationPage />
      </Provider>,
    );
    const { getByTestId } = utils;
    const stationList = getByTestId('station-list');
    return {
      ...utils,
      stationList,
    };
  };

  it('지하철역 목록을 불러온다.', async () => {
    const { stationList, getAllByTestId } = setup();
    expect(stationList).toBeInTheDocument();
    const stations = await waitFor(() => getAllByTestId('station-item'));
    expect(stations).toHaveLength(2);
  });

  it('새로운 지하철역을 추가할 수 있다.', async () => {
    const { getByRole, getByText } = setup();
    const newStationInput = getByRole('textbox', {
      name: /지하철 역 이름을 입력해주세요\./i,
    });
    const addButton = getByRole('button', { name: /추가/i });

    stationsData.push({ id: 3, name: '흑석' });
    fireEvent.change(newStationInput, { target: { value: '흑석' } });
    fireEvent.click(addButton);

    const newStation = await waitFor(() => getByText(/흑석/i));
    expect(newStation).toBeInTheDocument();
  });

  it('지하철역을 삭제할 수 있다.', async () => {
    const { getAllByTestId, getByText } = setup();
    const targetStation = await waitFor(() => getByText(/흑석/i));
    const deleteButton = within(targetStation).getAllByRole('button')[1];

    fireEvent.click(deleteButton);
    stationsData.pop();

    await waitFor(() => expect(getAllByTestId('station-item')).toHaveLength(2));
  });

  it('지하철역을 수정할 수 있다.', async () => {
    const { getByText } = setup();
    const targetStation = await waitFor(() => getByText(/잠실/i));
    const editButton = within(targetStation).getAllByRole('button')[0];
    fireEvent.click(editButton);

    const editInput = await waitFor(() => within(targetStation).getByRole('textbox'));
    fireEvent.change(editInput, { target: { value: '흑석' } });

    const confirmButton = within(targetStation).getAllByRole('button')[0];
    fireEvent.click(confirmButton);

    stationsData.find((station) => station.name === '잠실').name = '흑석';

    const updatedStation = await waitFor(() => getByText(/흑석/i));
    expect(updatedStation).toBeInTheDocument();
  });
});
