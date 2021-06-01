import React from 'react';
import { customRender } from '../../test-utils';
import Stations from './Stations';
import userEvent from '@testing-library/user-event';
import { requestAddStation, requestDeleteStation, requestGetStations } from '../../api/stations';
import { LABEL_TEXT } from '../../constants/a11y';

jest.mock('../../util/sessionStorage');
jest.mock('../../api/stations');

describe('역 관리 페이지 테스트', () => {
  it('역 목록 조회 요청', () => {
    customRender(<Stations />);

    expect(requestGetStations).toBeCalledTimes(1);
  });

  it('역 추가 요청', () => {
    const screen = customRender(<Stations />);
    const $stationInput = screen.getByRole('textbox', {
      name: LABEL_TEXT.PLEASE_INPUT_STATION_NAME,
    });
    const $addButton = screen.getByRole('button', {
      name: LABEL_TEXT.ADD,
    });

    userEvent.type($stationInput, '새로운역');
    userEvent.click($addButton);

    expect(requestAddStation).toBeCalledTimes(1);
  });

  it('역 삭제 요청', async () => {
    const screen = customRender(<Stations />);
    const [$deleteButton] = screen.getAllByLabelText(LABEL_TEXT.DELETE_BUTTON);

    userEvent.click($deleteButton);

    expect(requestDeleteStation).toBeCalledTimes(1);
  });
});
