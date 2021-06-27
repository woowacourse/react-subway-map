import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Wrapper, beforeEachFn } from './common';
import { mockLines, mockToken } from '../mocks/mockData';
import useLine from '../service/hooks/useLine';
import { LineForm } from '../types';
import useLineAddForm from '../service/hooks/useLineAddForm';
import { requestDeleteStation } from '../service/request/station';

beforeEach(beforeEachFn);

const renderUseLineHook = () =>
  renderHook(() => useLine(mockToken), { wrapper: Wrapper });

const renderUseLineAddFormHook = () =>
  renderHook(() => useLineAddForm(mockToken), { wrapper: Wrapper });

describe('useLine', () => {
  test('사용자는 등록되어 있는 전체 지하철 노선 목록을 조회할 수 있다', async () => {
    const { result } = renderUseLineHook();

    await waitFor(() =>
      expect(result.current.linesQuery.data).toHaveLength(mockLines.length)
    );
  });

  test('사용자는 지하철 노선을 추가할 수 있다.', async () => {
    const { result } = renderUseLineHook();

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
    const { result } = renderUseLineHook();

    act(() => result.current.deleteLine(3));

    await waitFor(() =>
      expect(result.current.isDeleteLineSuccess).toBeTruthy()
    );
  });
});

describe('useLineAddForm', () => {
  test('노선 이름은 2자 이상 10자 이하의 한글이어야 한다.', async () => {
    const { result } = renderUseLineAddFormHook();

    const beneathMinLengthString = '일';
    const overMaxLengthString = '일'.repeat(11);
    const englishString = 'abc';

    act(() => result.current.setName(beneathMinLengthString));

    await waitFor(() => expect(result.current.isValidName).toBeFalsy());

    act(() => result.current.setName(overMaxLengthString));
    await waitFor(() => expect(result.current.isValidName).toBeFalsy());

    act(() => result.current.setName(englishString));
    await waitFor(() => expect(result.current.isValidName).toBeFalsy());
  });

  test('노선 이름은 숫자를 포함하지 않는다.', async () => {
    const { result } = renderUseLineAddFormHook();

    const stringWithNumber = '노선3';

    act(() => result.current.setName(stringWithNumber));

    await waitFor(() => expect(result.current.isValidName).toBeFalsy());
  });

  test('노선 이름은 공백를 포함하지 않는다.', async () => {
    const { result } = renderUseLineAddFormHook();

    const stringWithSpace = '노 선 임';

    act(() => result.current.setName(stringWithSpace));

    await waitFor(() => expect(result.current.isValidName).toBeFalsy());
  });

  test('상행선역을 설정하면 하행선 선택창에서는 해당 역이 존재하지 않는다.', async () => {
    const { result } = renderUseLineAddFormHook();

    const upStationId = result.current.availableDownStations[0].id;

    act(() => result.current.setUpStationId(upStationId));

    await waitFor(() =>
      expect(
        result.current.availableDownStations.map(({ id }) => id)
      ).not.toContain(upStationId)
    );
  });
});
