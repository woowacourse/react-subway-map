/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../test-utils';
import RouteMapPage from './RouteMapPage';
import { LINE_LIST } from '../../mocks/mockData';

describe('전체보기 페이지', () => {
  beforeEach(() => {
    render(<RouteMapPage />);
  });

  it('노선을 선택하면 해당 노선의 역을 조회할 수 있으며, 노선 이름과 역의 개수가 데이터와 일치한다', async () => {
    const targetLineId = 2;
    const targetLine = LINE_LIST.find((line) => line.id === targetLineId);
    const lineName = targetLine.name;
    const lineStations = targetLine.stations;

    const lineSelect = screen.getByRole('combobox', { name: /노선 선택/ });
    await waitFor(() => screen.getAllByRole('option'));
    await waitFor(() => userEvent.selectOptions(lineSelect, `${targetLineId}`));

    const routeLineName = await waitFor(() =>
      screen.getByRole('heading', { name: new RegExp(lineName, 'i') })
    );
    const routeListItems = await waitFor(() => screen.findAllByRole('listitem'));

    expect(routeLineName).toHaveTextContent(lineName);
    await waitFor(() => expect(routeListItems).toHaveLength(lineStations.length));
  });
});
