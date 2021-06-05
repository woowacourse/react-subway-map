import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, within } from 'test/test-util';
import { stationHandlers } from 'test/server';
import { stations as stationsData } from 'test/mock';
import { API_STATUS } from 'constants/api';
import StationPage from '.';

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

const server = setupServer(...stationHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('StationPage 테스트', () => {
  const setup = () => {
    const utils = render(
      <Provider store={mockStore}>
        <StationPage />,
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
    expect(stations).toHaveLength(5);
  });

  it('새로운 지하철역을 추가할 수 있다.', async () => {
    const { getByRole, getByText } = setup();
    const newStationInput = getByRole('textbox', {
      name: /지하철 역 이름을 입력해주세요\./i,
    });
    const addButton = getByRole('button', { name: /추가/i });

    stationsData.push({ id: 6, name: '신반포역' });
    fireEvent.change(newStationInput, { target: { value: '신반포역' } });
    fireEvent.click(addButton);

    const newStation = await waitFor(() => getByText(/신반포역/i));
    expect(newStation).toBeInTheDocument();
  });

  it('지하철역을 수정할 수 있다.', async () => {
    const { getByText } = setup();
    const targetStation = await waitFor(() => getByText(/구반포역/i));
    const editButton = within(targetStation).getAllByRole('button')[0];
    fireEvent.click(editButton);

    const editInput = await waitFor(() => within(targetStation).getByRole('textbox'));
    fireEvent.change(editInput, { target: { value: '잠실역' } });

    const confirmButton = within(targetStation).getAllByRole('button')[0];
    fireEvent.click(confirmButton);

    stationsData.find((station) => station.name === '구반포역').name = '잠실역';

    const updatedStation = await waitFor(() => getByText(/잠실역/i));
    expect(updatedStation).toBeInTheDocument();
  });
});
