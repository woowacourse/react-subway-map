import React from 'react';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, within } from 'test/test-util';
import { stations as stationsData } from 'test/mockData';
import { stationHandlers } from 'test/handlers';
import StationPage from '.';

const server = setupServer(...stationHandlers);

describe('StationPage 테스트', () => {
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => true);
    server.listen();
  });

  beforeEach(() => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const setup = () => {
    const utils = render(<StationPage />);
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
    expect(stations).toHaveLength(stationsData.length);
  });

  it('새로운 지하철역을 추가할 수 있다.', async () => {
    const { getByRole, getByText, container } = setup();
    const newStationInput = getByRole('textbox', {
      name: /지하철 역 이름을 입력해주세요\./i,
    });
    const addButton = getByRole('button', { name: /추가/i });

    fireEvent.change(newStationInput, { target: { value: '신반포역' } });
    fireEvent.click(addButton);

    await waitFor(() => expect(container).toHaveTextContent('지하철역을 추가했습니다.'));
    const newStation = await waitFor(() => getByText('신반포역'));
    expect(newStation).toBeInTheDocument();
  });

  it('지하철역을 수정할 수 있다.', async () => {
    const { getByText, container } = setup();
    const targetStation = await waitFor(() => getByText(/구반포역/i));
    const editButton = within(targetStation).getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const editInput = await waitFor(() => within(targetStation).getByRole('textbox'));
    fireEvent.change(editInput, { target: { value: '잠실역' } });
    fireEvent.submit(editInput);

    await waitFor(() => expect(container).toHaveTextContent('지하철역 이름을 변경했습니다.'));
    const updatedStation = await waitFor(() => getByText(/잠실역/i));
    expect(updatedStation).toBeInTheDocument();
  });

  it('지하철역을 삭제할 수 있다.', async () => {
    const { getByText, container } = setup();
    const targetStation = await waitFor(() => getByText(/구반포역/i));
    const deleteButton = within(targetStation).getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(container).toHaveTextContent('지하철역을 삭제했습니다.'));
    // expect(targetStation).not.toBeInTheDocument();
  });
});
