/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen, waitFor, fireEvent, getByLabelText, within } from '../../test-utils';
import SectionPage from './SectionPage';
import { LINE_LIST } from '../../mocks/mockData';
import MESSAGE from '../../constants/message';

const addSection = (addModal, { lineId, upStationId, downStationId, distance }) => {
  const lineSelect = within(addModal).getByRole('combobox', {
    name: /노선 선택/,
  });
  const upStationSelect = within(addModal).getByRole('combobox', {
    name: /상행역/,
  });
  const downStationSelect = within(addModal).getByRole('combobox', {
    name: /하행역/,
  });
  const distanceInput = within(addModal).getByRole('spinbutton', {
    name: /거리/,
  });
  const addSectionSubmitButton = within(addModal).getByRole('button', {
    name: /추가/,
  });

  fireEvent.change(lineSelect, {
    target: { value: lineId },
  });

  fireEvent.change(upStationSelect, {
    target: { value: upStationId },
  });

  fireEvent.change(downStationSelect, {
    target: { value: downStationId },
  });

  fireEvent.change(distanceInput, {
    target: { value: distance },
  });

  fireEvent.click(addSectionSubmitButton);
};

describe('지하철 구간 관리', () => {
  beforeEach(() => {
    render(<SectionPage />);
  });

  describe('지하철 구간 목록 조회', () => {
    it('지하철 구간 관리 페이지에서 구간 목록을 조회한다', async () => {
      const lineList = await waitFor(() => screen.findAllByRole('option'));

      expect(lineList).toHaveLength(LINE_LIST.length);
    });
  });

  describe('지하철 구간 추가', () => {
    it('지하철 구간 추가 시 추가되었다는 메시지를 확인할 수 있다.', async () => {
      const lineId = 1;
      const upStationId = 8;
      const downStationId = 10;
      const distance = 2;

      const addSectionButton = screen.getByLabelText('구간 추가');
      fireEvent.click(addSectionButton);

      const addModal = await waitFor(() => screen.getByRole('dialog'));
      addSection(addModal, { lineId, upStationId, downStationId, distance });

      const alertMessage = await waitFor(() => screen.getByRole('alert'));
      expect(alertMessage).toHaveTextContent(MESSAGE.SUCCESS.SECTION_ADDED);
    });
  });

  describe('지하철 구간 삭제', () => {
    it('지하철 구간 삭제 시 구간이 삭제되었다는 메시지를 확인할 수 있다.', async () => {
      const lineId = 2;
      const lineSelect = screen.getByRole('combobox', {
        name: /노선 선택/,
      });

      fireEvent.change(lineSelect, {
        target: { value: lineId },
      });

      const stationList = await waitFor(() => screen.findAllByRole('listitem'));
      const [targetStation] = stationList;

      const deleteButton = getByLabelText(targetStation, '구간 삭제');
      fireEvent.click(deleteButton);

      const alertMessage = await waitFor(() => screen.getByRole('alert'));
      expect(alertMessage).toHaveTextContent(MESSAGE.SUCCESS.SECTION_DELETED);
    });
  });
});
