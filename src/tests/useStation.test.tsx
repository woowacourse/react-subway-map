import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { Wrapper, beforeEachFn } from './common';
import useStation from '../service/hooks/useStation';
import { mockStations, mockToken } from '../mocks/mockData';
import { act } from 'react-dom/test-utils';
import { Station, StationForm } from '../types';
import useStationAddForm from '../service/hooks/useStationAddForm';

beforeEach(beforeEachFn);

const renderUseStationHook = () =>
  renderHook(() => useStation(mockToken), {
    wrapper: Wrapper,
  });

const renderUseStationAddFormHook = () =>
  renderHook(() => useStationAddForm(), {
    wrapper: Wrapper,
  });

describe('useStation', () => {
  test('사용자는 등록되어 있는 전체 지하철 역 목록을 조회할 수 있다.', async () => {
    const { result } = renderUseStationHook();

    await waitFor(() =>
      expect(result.current.stations as Station[]).toHaveLength(
        mockStations.length
      )
    );
  });

  test('사용자는 지하철 역을 추가할 수 있다.', async () => {
    const { result } = renderUseStationHook();

    const testData: StationForm = {
      name: '광교역',
    };

    act(() => result.current.addStation(testData));

    await waitFor(() =>
      expect(result.current.isAddStationSuccess).toBeTruthy()
    );
  });

  test('사용자는 지하철 역을 삭제할 수 있다.', async () => {
    const { result } = renderUseStationHook();

    act(() => result.current.deleteStation(3));

    await waitFor(() =>
      expect(result.current.isDeleteStationSuccess).toBeTruthy()
    );
  });
});

describe('useStationAddForm', () => {
  test('역 이름은 2자 이상 20자 이하의 한글이어야 한다', async () => {
    const { result } = renderUseStationAddFormHook();

    const beneathMinLengthString = '일';
    const overMaxLengthString = '일'.repeat(21);
    const englishString = 'abc';

    act(() => result.current.setName(beneathMinLengthString));

    await waitFor(() => expect(result.current.isValidName).toBeFalsy());

    act(() => result.current.setName(overMaxLengthString));
    await waitFor(() => expect(result.current.isValidName).toBeFalsy());

    act(() => result.current.setName(englishString));
    await waitFor(() => expect(result.current.isValidName).toBeFalsy());
  });
});
