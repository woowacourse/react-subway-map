import React from 'react';
import { customRender } from '../../test-utils';
import { getSessionStorageItem } from '../../util/sessionStorage';
import Stations from './Stations';
import userEvent from '@testing-library/user-event';
import { requestAddStation, requestDeleteStation, requestGetStations } from '../../api/stations';

jest.mock('../../util/sessionStorage');
jest.mock('../../api/stations');

describe('역 관리 페이지 테스트', () => {
  it('역 목록 조회 요청', () => {
    const screen = customRender(<Stations />);

    expect(requestGetStations).toBeCalledTimes(1);
  });

  it('역 추가 요청', () => {
    const screen = customRender(<Stations />);
    const stationInput = screen.getByRole('textbox', {
      name: '지하철 역 이름을 입력해주세요',
    });

    userEvent.type(stationInput, '새로운역');

    const addButton = screen.getByRole('button', {
      name: '추가',
    });

    userEvent.click(addButton);

    expect(requestAddStation).toBeCalledTimes(1);
  });

  it('역 삭제 요청', async () => {
    const screen = customRender(<Stations />);
    const [deleteButton] = screen.getAllByLabelText('삭제버튼');

    userEvent.click(deleteButton);

    expect(requestDeleteStation).toBeCalledTimes(1);
  });
});
