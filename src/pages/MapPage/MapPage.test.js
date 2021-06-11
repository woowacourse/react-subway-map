import React from 'react';
import { render, screen, waitFor, fireEvent } from '../../test-utils';
import MapPage from './MapPage';
import { LINE_LIST } from '../../mocks/mockData';

describe('전체 목록 관리', () => {
  beforeEach(() => {
    render(<MapPage />);
  });

  describe('지하철 전체 목록 조회', () => {
    it('지하철 전체 목록 조회 페이지에서 전체 목록을 조회한다.', async () => {
      const mapList = await waitFor(() => screen.findAllByRole('listitem'));

      expect(mapList).toHaveLength(LINE_LIST.length);
    });

    it('노선을 선택하면 해당 노선의 목록을 조회한다.', async () => {
      const lineId = 1;
      const targetLine = LINE_LIST.find((line) => line.id === lineId);
      const targetStationName = targetLine.stations[0].name;

      const lineSelect = screen.getByRole('combobox', {
        name: /노선을 선택해주세요./,
      });

      fireEvent.change(lineSelect, {
        target: { value: lineId },
      });

      const lineList = await waitFor(() => screen.findAllByRole('listitem'));
      const stationName = await waitFor(() => screen.getByText(targetStationName));

      expect(lineList).toHaveLength(1);
      expect(stationName).toHaveTextContent(targetStationName);
    });
  });
});
