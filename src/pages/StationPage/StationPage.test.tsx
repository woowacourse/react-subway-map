import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';

import StationPage from './StationPage';
import { API as stationAPI } from '../../hooks/useStations';
import { API as lineAPI } from '../../hooks/useLines';

import request from '../../request';
import UserProvider from '../../contexts/UserContextProvider';

const BASE_URL = 'https://subwaybot.n-e.kr';
const mock_stations = [
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

const mock_lines = [
  {
    id: 0,
    name: '피터선',
    color: 'RED',
    sections: [
      {
        id: 0,
        upStation: {
          id: 1,
          name: '잠실역',
        },
        downStation: {
          id: 5,
          name: '선릉역',
        },
        distance: 100,
      },
    ],
  },
];

const VALID_STATION_NAME = '피터역';

describe('사용자는 지하철 역 관리 기능을 이용할 수 있다.', () => {
  beforeEach(async () => {
    request.getUserInfo = jest.fn().mockResolvedValue({ id: 1, age: 9, email: 'tets@test.com' });

    stationAPI.get = jest.fn().mockImplementation(() => {
      return mock_stations;
    });
    stationAPI.post = jest.fn();
    stationAPI.delete = jest.fn();

    lineAPI.get = jest.fn().mockImplementation(() => {
      return mock_lines;
    });

    localStorage.setItem(
      'accessToken',
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjIyMDMzMjkxLCJleHAiOjE2MjIwMzY4OTF9.-M7TyMMvXk-y5-kIoPP4crTt6Nnvv8ubREKKZjO5d7A'
    );

    render(
      <UserProvider>
        <StationPage setIsLoading={() => {}} />
      </UserProvider>
    );

    await waitFor(() => expect(stationAPI.get).toBeCalled());
    await waitFor(() => expect(lineAPI.get).toBeCalled());
  });

  afterEach(() => {});

  it('사용자는 등록되어 있는 전체 지하철 역 목록을 조회할 수 있다.', async () => {
    const stationList = await waitFor(() => screen.getByLabelText('역 목록'));

    await waitFor(() =>
      mock_stations.every((station) => within(stationList).getByText(station.name))
    );
  });

  it('등록된 지하철 역이 없는 경우, 지하철 역 없음 이미지를 보여준다.', async () => {
    stationAPI.get = jest.fn().mockReturnValueOnce([]);
    render(<StationPage setIsLoading={() => {}} />);

    await waitFor(() => screen.getByAltText('지하철 역 없음 이미지'));
  });

  it('지하철역 추가가 가능하다.', async () => {
    const StationName = screen.getByLabelText('지하철 역 이름 입력');
    const addButton = screen.getByRole('button', { name: /추가/i });

    fireEvent.change(StationName, { target: { value: VALID_STATION_NAME } });
    fireEvent.click(addButton);

    await waitFor(() => expect(stationAPI.post).toBeCalled());
    await waitFor(() => expect(stationAPI.get).toBeCalled());
  });

  it('지하철역 삭제가 가능하다.', async () => {
    const deleteButton = screen.getByLabelText('잠실역 삭제');
    const confirmSpy = jest.spyOn(window, 'confirm');

    confirmSpy.mockImplementation(jest.fn(() => true));

    fireEvent.click(deleteButton);

    expect(confirmSpy).toBeCalled();

    await waitFor(() => expect(stationAPI.delete).toBeCalled());
    await waitFor(() => expect(stationAPI.get).toBeCalled());
  });
});
