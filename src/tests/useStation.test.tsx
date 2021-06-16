import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { Wrapper, beforeEachFn } from './common';
import useStation from '../service/hooks/useStation';
import { mockStations } from '../mocks/mockData';
import { act } from 'react-dom/test-utils';
import { StationForm } from '../types';

beforeEach(beforeEachFn);

describe('useStation', () => {
  test('사용자는 등록되어 있는 전체 지하철 역 목록을 조회할 수 있다.', async () => {
    const { result } = renderHook(() => useStation(), { wrapper: Wrapper });

    await waitFor(() =>
      expect(result.current.stations.data).toHaveLength(mockStations.length)
    );
  });

  test('사용자는 지하철 역을 추가할 수 있다.', async () => {
    const { result } = renderHook(() => useStation(), { wrapper: Wrapper });

    const testData: StationForm = {
      name: '광교역',
    };

    act(() => result.current.addStation(testData));

    await waitFor(() =>
      expect(result.current.isAddStationSuccess).toBeTruthy()
    );
  });

  test('사용자는 지하철 역을 삭제할 수 있다.', async () => {
    const { result } = renderHook(() => useStation(), { wrapper: Wrapper });

    act(() => result.current.deleteStation(3));

    await waitFor(() =>
      expect(result.current.isDeleteStationSuccess).toBeTruthy()
    );
  });
});
