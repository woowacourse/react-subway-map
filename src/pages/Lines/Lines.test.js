import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  requestAddLine,
  requestDeleteLine,
  requestGetLines,
  requestModifyLine,
} from '../../api/lines';
import { customRender } from '../../test-utils';
import Lines from './Lines';

jest.mock('../../util/sessionStorage');
jest.mock('../../api/lines');
jest.mock('../../api/stations');

describe('노선 관리 페이지 테스트', () => {
  it('노선 목록 요청, 화면에 목록 띄우기', async () => {
    const screen = customRender(<Lines />);
    const $$lineList = await waitFor(() => screen.getAllByTestId('lineListItem'));

    expect(requestGetLines).toBeCalledTimes(1);
    expect($$lineList.length).toBeGreaterThanOrEqual(1);
  });

  it('노선 추가 요청', async () => {
    const screen = customRender(<Lines />);
    const $addButton = screen.getByRole('button', {
      name: '노선 추가 버튼',
    });

    userEvent.click($addButton);

    const $lineNameInput = screen.getByRole('textbox', {
      name: '노선 이름',
    });
    const $upStationSelectBox = screen.getByLabelText('상행역 선택 콤보박스');
    const $downStationSelectBox = screen.getByLabelText('하행역 선택 콤보박스');
    const $distanceInput = screen.getByRole('spinbutton', {
      name: '거리',
    });
    const $$colorRadioButton = screen.getAllByRole('radio', {
      name: '노선 색상 선택 라디오버튼',
    });
    const $enabledColorRadioButton = $$colorRadioButton.find(($button) => !$button.disabled);
    const $submitButton = screen.getByRole('button', {
      name: '확인',
    });

    userEvent.type($lineNameInput, '미키테스트노선');
    await waitFor(() => userEvent.selectOptions($upStationSelectBox, '1'));
    await waitFor(() => userEvent.selectOptions($downStationSelectBox, '2'));
    userEvent.type($distanceInput, '100');
    userEvent.click($enabledColorRadioButton);
    userEvent.click($submitButton);

    expect(requestAddLine).toBeCalledTimes(1);
  });

  it('노선 수정 요청', () => {
    const screen = customRender(<Lines />);
    const [$modifyButton] = screen.getAllByLabelText('수정버튼');

    userEvent.click($modifyButton);

    const lineNameInput = screen.getByRole('textbox', {
      name: '노선 이름',
    });
    const submitButton = screen.getByRole('button', {
      name: '확인',
    });

    userEvent.type(lineNameInput, '2');
    userEvent.click(submitButton);

    expect(requestModifyLine).toBeCalledTimes(1);
  });

  it('노선 삭제 요청', () => {
    const screen = customRender(<Lines />);
    const [$deleteButton] = screen.getAllByLabelText('삭제버튼');

    userEvent.click($deleteButton);

    expect(requestDeleteLine).toBeCalledTimes(1);
  });
});
