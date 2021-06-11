import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';

import StationPage from './StationPage';
import stationAPI from '../../apis/station';

import request from '../../request';
import UserProvider from '../../contexts/UserContextProvider';
import { mockAccessToken } from '../../mockData';

const mock_stations = [
  {
    id: 1,
    name: '잠실역',
    lines: [{ id: 1, name: '안녕', color: 'RED' }],
  },
  {
    id: 2,
    name: '잠실새내역',
    lines: [{ id: 2, name: '1호선', color: 'MALCHA' }],
  },
  {
    id: 3,
    name: '종합운동장역',
    lines: [],
  },
];

const VALID_STATION_NAME = '피터역';

describe('사용자는 지하철 역 관리 기능을 이용할 수 있다.', () => {
  beforeEach(async () => {
    request.getUserInfo = jest
      .fn()
      .mockResolvedValue({ ok: true, data: { id: 1, age: 9, email: 'tets@test.com' } });

    stationAPI.get = jest.fn().mockImplementation(() => {
      return { ok: true, data: mock_stations };
    });
    stationAPI.post = jest.fn().mockImplementation(() => {
      return { ok: true };
    });
    stationAPI.delete = jest.fn().mockImplementation(() => {
      return { ok: true };
    });

    localStorage.setItem('accessToken', mockAccessToken);

    render(
      <UserProvider>
        <StationPage setIsLoading={() => {}} />
      </UserProvider>
    );

    await waitFor(() => expect(stationAPI.get).toBeCalled());
  });

  afterEach(() => {});

  it('사용자는 등록되어 있는 전체 지하철 역 목록을 조회할 수 있다.', async () => {
    const stationList = await waitFor(() => screen.getByLabelText('역 목록'));

    await waitFor(() =>
      mock_stations.every((station) => within(stationList).getByText(station.name))
    );
  });

  it('등록된 지하철 역이 없는 경우, 지하철 역 없음 이미지를 보여준다.', async () => {
    stationAPI.get = jest.fn().mockReturnValueOnce({ ok: true, data: [] });
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
