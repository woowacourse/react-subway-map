import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { Wrapper, beforeEachFn } from './common';
import { mockLines } from '../mocks/mockData';
import { act } from 'react-dom/test-utils';
import useLine from '../service/hooks/useLine';
import { LineForm } from '../types';

beforeEach(beforeEachFn);

describe('useLine', () => {
  test('사용자는 등록되어 있는 전체 지하철 노선 목록을 조회할 수 있다', async () => {
    const { result } = renderHook(() => useLine(), { wrapper: Wrapper });

    await waitFor(() =>
      expect(result.current.linesQuery.data).toHaveLength(mockLines.length)
    );
  });

  test('사용자는 지하철 노선을 추가할 수 있다.', async () => {
    const { result } = renderHook(() => useLine(), { wrapper: Wrapper });

    const testData: LineForm = {
      name: '한글노선',
      color: 'red',
      distance: 10,
      downStationId: 1,
      upStationId: 2,
    };

    act(() => result.current.addLine(testData));

    await waitFor(() => expect(result.current.isAddLineSuccess).toBeTruthy());
  });

  test('사용자는 지하철 노선을 삭제할 수 있다.', async () => {
    const { result } = renderHook(() => useLine(), { wrapper: Wrapper });

    act(() => result.current.deleteLine(3));

    await waitFor(() =>
      expect(result.current.isDeleteLineSuccess).toBeTruthy()
    );
  });
});
