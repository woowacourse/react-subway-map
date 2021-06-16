import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { Wrapper, beforeEachFn } from './common';
import { mockLines, mockToken } from '../mocks/mockData';
import { act } from 'react-dom/test-utils';
import useSection from '../service/hooks/useSection';
import { SectionForm } from '../types';

beforeEach(beforeEachFn);

const renderUseSectionHook = () =>
  renderHook(() => useSection(mockToken), {
    wrapper: Wrapper,
  });

describe('useSection', () => {
  test('사용자는 특정 노선의 전체 구간 목록을 확인할 수 있다', async () => {
    const { result, waitForNextUpdate } = renderUseSectionHook();

    act(() => result.current.setCurrentLineId(1));

    await waitForNextUpdate();

    const LineOne = mockLines.find((line) => line.id === 1);

    await waitFor(() => {
      expect(result.current.currentLineDetail.stations).toHaveLength(
        LineOne?.stations.length ?? -1
      );
    });
  });

  test('사용자는 특정 지하철 노선에 구간을 추가할 수 있다', async () => {
    const { result, waitForNextUpdate } = renderUseSectionHook();

    act(() => result.current.setCurrentLineId(1));

    await waitForNextUpdate();

    const testData: SectionForm = {
      distance: 2,
      downStationId: 1,
      upStationId: 2,
    };

    act(() => result.current.addSection(testData));

    await waitFor(() =>
      expect(result.current.isAddSectionSuccess).toBeTruthy()
    );
  });

  test('사용자는 노선에 등록되어 있는 구간을 삭제할 수 있다', async () => {
    const { result } = renderUseSectionHook();

    act(() => result.current.deleteSection(1));

    await waitFor(() =>
      expect(result.current.isDeleteSectionSuccess).toBeTruthy()
    );
  });
});
