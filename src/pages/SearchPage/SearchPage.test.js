/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../test-utils';
import SearchPage from './SearchPage';
import { STATION_LIST } from '../../mocks/mockData';

describe('경로 검색 페이지', () => {
  beforeEach(() => {
    render(<SearchPage />);
  });

  it('출발역과 도착역 선택 후 경로 검색 시, 상세 경로에서의 역 개수와 server response의 개수와 역 이름이 모두 일치하는지 확인한다.', async () => {
    const upStationId = 5;
    const downStationId = 11;

    const upStation = STATION_LIST.find((station) => station.id === upStationId);
    const downStation = STATION_LIST.find((station) => station.id === downStationId);
    const targetStations = [upStation.name, downStation.name];

    const upStationSelect = screen.getByRole('combobox', { name: /출발역/ });
    const downStationSelect = screen.getByRole('combobox', { name: /도착역/ });
    await waitFor(() => screen.getAllByRole('option'));

    const searchButton = screen.getByRole('button', { name: '검색' });
    userEvent.click(searchButton);

    userEvent.selectOptions(upStationSelect, `${upStationId}`);
    userEvent.selectOptions(downStationSelect, `${downStationId}`);

    const resultRoutes = await waitFor(() => screen.getAllByRole('listitem'));
    expect(resultRoutes).toHaveLength(2);

    resultRoutes.forEach((station, index) => {
      expect(station).toHaveTextContent(targetStations[index]);
    });
  });
});
