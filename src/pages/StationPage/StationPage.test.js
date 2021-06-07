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
import MESSAGE from '../../constants/message';

const addStation = (name) => {
  const stationNameInput = screen.getByRole('textbox', {
    name: /지하철 역 이름을 입력해주세요/,
  });

  const addButton = screen.getByRole('button', {
    name: '추가',
  });

  fireEvent.change(stationNameInput, {
    target: {
      value: name,
    },
  });
  fireEvent.click(addButton);
};

const editStation = (targetStation, name) => {
  const editModalOpenButton = getByLabelText(targetStation, '역 수정');

  fireEvent.click(editModalOpenButton);

  const editModal = screen.getByRole('dialog');
  const editStationNameInput = getByPlaceholderText(editModal, '역 이름');
  const editButton = getByRole(editModal, 'button', {
    name: '수정',
  });

  fireEvent.change(editStationNameInput, {
    target: { value: name },
  });

  fireEvent.click(editButton);
};

describe('지하철 역 관리', () => {
  beforeEach(() => {
    render(<StationPage />);
  });

  describe('지하철 역 목록 조회', () => {
    it('지하철 역 관리 페이지에서 역 목록을 조회한다.', async () => {
      const stationList = await waitFor(() => screen.findAllByRole('listitem'));

      expect(stationList).toHaveLength(STATION_LIST.length);
    });
  });

  describe('지하철 역 추가', () => {
    it('지하철 역 추가 시 역 목록에서 확인할 수 있다.', async () => {
      const keyword = '디토';
      addStation(keyword);

      const ditto = await waitFor(() => screen.getByText(keyword));
      expect(ditto).toBeInTheDocument();
    });

    it('지하철 역 추가 시 1글자인 역 이름을 입력할 수 없으며, 에러 메시지를 확인할 수 있다.', async () => {
      const keyword = '촆';
      addStation(keyword);

      const stationList = await waitFor(() => screen.findAllByRole('listitem'));
      const alertMessage = await waitFor(() => screen.getByRole('alert'));

      expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_STATION_NAME_LENGTH);
      expect(stationList).not.toContain(new RegExp(keyword));
    });

    it('지하철 역 추가 시 21글자인 역 이름을 입력할 수 없으며, 에러 메시지를 확인할 수 있다.', async () => {
      const keyword = '21글자이상인역이름을입력할수없습니다람쥐';
      addStation(keyword);

      const stationList = await waitFor(() => screen.findAllByRole('listitem'));
      const alertMessage = await waitFor(() => screen.getByRole('alert'));

      expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_STATION_NAME_LENGTH);
      expect(stationList).not.toContain(new RegExp(keyword));
    });
  });

  describe('지하철 역 수정', () => {
    it('지하철 역 수정 시 정상적으로 역 이름이 변경된다.', async () => {
      const keyword = '체프역';

      const stationList = await waitFor(() => screen.findAllByRole('listitem'));
      const [targetStation] = stationList;

      editStation(targetStation, keyword);

      const editedStation = await waitFor(() => screen.getByText(keyword));
      expect(editedStation).toBeInTheDocument();
    });

    it('지하철 역 수정 시 1글자인 역 이름을 입력할 수 없으며, 에러 메시지를 확인할 수 있다', async () => {
      const keyword = '쳎';

      const stationList = await waitFor(() => screen.findAllByRole('listitem'));
      const [targetStation] = stationList;

      editStation(targetStation, keyword);

      const alertMessage = await waitFor(() => screen.getByRole('alert'));

      expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_STATION_NAME_LENGTH);
      expect(targetStation).not.toHaveTextContent(new RegExp(keyword));
    });

    it('지하철 역 수정 시 21글자인 역 이름을 입력할 수 없으며, 에러 메시지를 확인할 수 있다.', async () => {
      const keyword = '21글자이상인역이름을입력할수없습니다람쥐';

      const stationList = await waitFor(() => screen.findAllByRole('listitem'));
      const [targetStation] = stationList;

      editStation(targetStation, keyword);

      const alertMessage = await waitFor(() => screen.getByRole('alert'));

      expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_STATION_NAME_LENGTH);
      expect(targetStation).not.toHaveTextContent(new RegExp(keyword));
    });
  });

  describe('지하철 역 삭제', () => {
    it('지하철 역 삭제 시 유효한 삭제인지 검증한다.', async () => {
      const stationList = await waitFor(() => screen.findAllByRole('listitem'));
      const [targetStation] = stationList;
      const deleteButton = getByLabelText(targetStation, '역 삭제');

      fireEvent.click(deleteButton);

      await waitFor(() => expect(targetStation).not.toBeInTheDocument());
    });
  });
});
