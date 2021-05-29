/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  getByRole,
  getByPlaceholderText,
  getByLabelText,
} from '../../test-utils';
import StationPage from './StationPage';
import { STATION_LIST } from '../../mocks/mockData';

describe('지하철 역 관리', () => {
  it('지하철 역 관리 페이지에서 역 목록을 조회한다', async () => {
    render(<StationPage />);

    const stationList = await waitFor(() => screen.findAllByRole('listitem'));

    expect(stationList).toHaveLength(STATION_LIST.length);
  });

  it('지하철 역 추가 시 역 목록에서 확인할 수 있다', async () => {
    render(<StationPage />);

    const stationNameInput = screen.getByRole('textbox', {
      name: /지하철 역 이름을 입력해주세요/,
    });

    const addButton = screen.getByRole('button', {
      name: '추가',
    });

    fireEvent.change(stationNameInput, {
      target: {
        value: '디토',
      },
    });
    fireEvent.click(addButton);

    const ditto = await waitFor(() => screen.getByText('디토'));

    expect(ditto).toBeInTheDocument();
  });

  it('지하철 역 수정 시 정상적으로 역 이름이 변경된다.', async () => {
    render(<StationPage />);

    const stationList = await waitFor(() => screen.findAllByRole('listitem'));
    const [targetStation] = stationList;

    const editModalOpenButton = getByLabelText(targetStation, '역 수정');

    fireEvent.click(editModalOpenButton);

    const editModal = screen.getByRole('dialog');
    const editStationNameInput = getByPlaceholderText(editModal, '역 이름');
    const editButton = getByRole(editModal, 'button', {
      name: '수정',
    });

    fireEvent.change(editStationNameInput, {
      target: { value: '체프역' },
    });

    fireEvent.click(editButton);

    const cheffe = await waitFor(() => screen.getByText('체프역'));

    expect(cheffe).toBeInTheDocument();
  });

  it('지하철 역 삭제 시 유효한 삭제인지 검증한다.', async () => {
    render(<StationPage />);

    const stationList = await waitFor(() => screen.findAllByRole('listitem'));
    const [targetStation] = stationList;
    const deleteButton = getByLabelText(targetStation, '역 삭제');

    fireEvent.click(deleteButton);

    await waitFor(() => expect(targetStation).not.toBeInTheDocument());
  });
});
