import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';

import SectionPage from './SectionPage';
import stationAPI from '../../apis/station';
import lineAPI from '../../apis/line';
import sectionAPI from '../../apis/section';

import request from '../../request';
import UserProvider from '../../contexts/UserContextProvider';
import { mockAccessToken } from '../../mockData';

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
    name: '강남역',
  },
];

const mock_lines = [
  {
    id: 0,
    name: '피터선',
    color: 'RED_100',
    stations: [
      {
        id: 1,
        name: '잠실역',
        distance: 100,
      },
      {
        id: 2,
        name: '잠실새내역',
        distance: 100,
      },
      { id: 3, name: '종합운동장역' },
    ],
  },
];

const VALID_LINE_NAME = '피터라인';

describe('사용자는 지하철 구간 관리 기능을 이용할 수 있다.', () => {
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

    lineAPI.get = jest.fn().mockImplementation(() => {
      return { ok: true, data: mock_lines };
    });
    lineAPI.post = jest.fn().mockImplementation(() => {
      return { ok: true };
    });
    lineAPI.delete = jest.fn().mockImplementation(() => {
      return { ok: true };
    });

    sectionAPI.post = jest.fn().mockImplementation(() => {
      return { ok: true };
    });
    sectionAPI.delete = jest.fn().mockImplementation(() => {
      return { ok: true };
    });

    localStorage.setItem('accessToken', mockAccessToken);

    render(
      <UserProvider>
        <SectionPage setIsLoading={() => {}} />
      </UserProvider>
    );

    await waitFor(() => expect(stationAPI.get).toBeCalled());
    await waitFor(() => expect(lineAPI.get).toBeCalled());
  });

  afterEach(() => {});

  it('사용자는 선택한 지하철 노선의 구간 목록을 조회할 수 있다.', async () => {
    const lineSelect = screen.getByLabelText('노선 선택');

    fireEvent.change(lineSelect, { target: { value: '1' } });

    const sectionList = await waitFor(() => screen.getByLabelText('구간 목록'));

    await waitFor(() =>
      mock_stations.slice(0, 3).every((station) => within(sectionList).getByText(station.name))
    );
  });

  it('선택한 지하철 노선이 없는 경우, 노선 선택안내 이미지를 보여준다.', async () => {
    await waitFor(() => screen.getByAltText('노선 선택 안내 메시지'));
  });

  it('지하철 구간 추가가 가능하다.', async () => {
    const lineSelect = screen.getByLabelText('노선 선택');
    fireEvent.change(lineSelect, { target: { value: '1' } });

    const formOpenButton = screen.getByLabelText('구간 추가');
    fireEvent.click(formOpenButton);

    const upStationSelect = screen.getByLabelText('상행역 선택');
    const downStationSelect = screen.getByLabelText('하행역 선택');
    const distanceInput = screen.getByLabelText('거리 입력');
    const addButton = screen.getByRole('button', { name: /^추가$/i });

    fireEvent.change(upStationSelect, { target: { value: '3' } });
    fireEvent.change(downStationSelect, { target: { value: '4' } });
    fireEvent.change(distanceInput, { target: { value: '20' } });
    fireEvent.click(addButton);

    await waitFor(() => expect(sectionAPI.post).toBeCalled());
    await waitFor(() => expect(lineAPI.get).toBeCalled());
  });

  it('지하철 구간 삭제가 가능하다.', async () => {
    const lineSelect = screen.getByLabelText('노선 선택');
    fireEvent.change(lineSelect, { target: { value: '1' } });

    const deleteButton = screen.getByLabelText('잠실역 삭제');
    const confirmSpy = jest.spyOn(window, 'confirm');

    confirmSpy.mockImplementation(jest.fn(() => true));

    fireEvent.click(deleteButton);

    expect(confirmSpy).toBeCalled();

    await waitFor(() => expect(sectionAPI.delete).toBeCalled());
    await waitFor(() => expect(lineAPI.get).toBeCalled());
  });
});
