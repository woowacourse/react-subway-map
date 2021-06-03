import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { Wrapper, beforeEachFn } from './common';
import { mockLines } from '../mocks/mockData';
import { act } from 'react-dom/test-utils';
import useSection from '../hooks/useSection';

beforeEach(beforeEachFn);

describe('useSection', () => {
  test('사용자는 특정 노선의 전체 구간 목록을 확인할 수 있다', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSection(), {
      wrapper: Wrapper,
    });

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
    const { result, waitForNextUpdate } = renderHook(() => useSection(), {
      wrapper: Wrapper,
    });

    act(() => result.current.setCurrentLineId(1));

    await waitForNextUpdate();

    act(() => result.current.setDistance(1));
    act(() => result.current.setUpStationId(1));
    act(() => result.current.setDownStationId(2));

    act(() => result.current.addSection());

    await waitFor(() =>
      expect(result.current.addSectionMutation.isSuccess).toBeTruthy()
    );
  });

  test('사용자는 노선에 등록되어 있는 구간을 삭제할 수 있다', async () => {
    const { result } = renderHook(() => useSection(), { wrapper: Wrapper });

    act(() => result.current.deleteSection(1));

    await waitFor(() =>
      expect(result.current.deleteSectionMutation.isSuccess).toBeTruthy()
    );
  });
});
