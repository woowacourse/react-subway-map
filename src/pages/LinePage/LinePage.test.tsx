import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';

import LinePage from './LinePage';
import stationAPI from '../../apis/station';
import lineAPI from '../../apis/line';

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

describe('사용자는 지하철 노선 관리 기능을 이용할 수 있다.', () => {
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

    localStorage.setItem('accessToken', mockAccessToken);

    render(
      <UserProvider>
        <LinePage setIsLoading={() => {}} />
      </UserProvider>
    );

    await waitFor(() => expect(stationAPI.get).toBeCalled());
    await waitFor(() => expect(lineAPI.get).toBeCalled());
  });

  afterEach(() => {});

  it('사용자는 등록되어 있는 전체 지하철 노선 목록을 조회할 수 있다.', async () => {
    const lineList = await waitFor(() => screen.getByLabelText('노선 목록'));

    await waitFor(() => mock_lines.every((line) => within(lineList).getByText(line.name)));
  });

  it('등록된 지하철 노선이 없는 경우, 지하철 노선 없음 이미지를 보여준다.', async () => {
    lineAPI.get = jest.fn().mockReturnValueOnce({ ok: true, data: [] });
    render(<LinePage setIsLoading={() => {}} />);

    await waitFor(() => screen.getByAltText('지하철 노선 없음 이미지'));
  });

  it('지하철 노선 추가가 가능하다.', async () => {
    const formOpenButton = screen.getByLabelText('노선 추가');
    fireEvent.click(formOpenButton);

    const LineNameInput = screen.getByLabelText('지하철 노선 이름 입력');
    const upStationSelect = screen.getByLabelText('상행종점 선택');
    const downStationSelect = screen.getByLabelText('하행종점 선택');
    const distanceInput = screen.getByLabelText('거리 입력');
    const form = screen.getByLabelText('노선 추가 양식');
    const addButton = screen.getByRole('button', { name: /^추가$/i });

    fireEvent.change(LineNameInput, { target: { value: VALID_LINE_NAME } });
    fireEvent.change(upStationSelect, { target: { value: '1' } });
    fireEvent.change(downStationSelect, { target: { value: '2' } });
    fireEvent.change(distanceInput, { target: { value: '20' } });
    fireEvent.change(form, { target: { color: { value: 'MALCHA_100' } } });
    fireEvent.click(addButton);

    await waitFor(() => expect(lineAPI.post).toBeCalled());
    await waitFor(() => expect(lineAPI.get).toBeCalled());
  });

  it('지하철 노선 삭제가 가능하다.', async () => {
    const deleteButton = screen.getByLabelText('피터선 삭제');
    const confirmSpy = jest.spyOn(window, 'confirm');

    confirmSpy.mockImplementation(jest.fn(() => true));

    fireEvent.click(deleteButton);

    expect(confirmSpy).toBeCalled();

    await waitFor(() => expect(lineAPI.delete).toBeCalled());
    await waitFor(() => expect(lineAPI.get).toBeCalled());
  });
});
