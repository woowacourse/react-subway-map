import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { Wrapper, beforeEachFn } from './common';
import { mockLines } from '../mocks/mockData';
import { act } from 'react-dom/test-utils';
import useLine from '../hooks/useLine';

beforeEach(beforeEachFn);

describe('useLine', () => {
  test('사용자는 등록되어 있는 전체 지하철 노선 목록을 조회할 수 있다', async () => {
    const { result } = renderHook(() => useLine(), { wrapper: Wrapper });

    await waitFor(() =>
      expect(result.current.lines.data).toHaveLength(mockLines.length)
    );
  });

  test('사용자는 지하철 노선을 추가할 수 있다.', async () => {
    const { result } = renderHook(() => useLine(), { wrapper: Wrapper });

    act(() => result.current.setName('멍청이파노선'));
    act(() => result.current.setColor('black'));
    act(() => result.current.setDistance(3));
    act(() => result.current.setUpStationId(1));
    act(() => result.current.setDownStationId(2));

    act(() => result.current.addLine());

    await waitFor(() =>
      expect(result.current.addLineMutation.isSuccess).toBeTruthy()
    );
  });

  test('사용자는 지하철 노선을 삭제할 수 있다.', async () => {
    const { result } = renderHook(() => useLine(), { wrapper: Wrapper });

    act(() => result.current.deleteLine(3));

    await waitFor(() =>
      expect(result.current.deleteLineMutation.isSuccess).toBeTruthy()
    );
  });
});
