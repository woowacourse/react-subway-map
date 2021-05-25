import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { StationPage } from '.';
import { SERVER_LIST } from '../../constants';

const mockServer = SERVER_LIST['Sally'];

describe('Station 테스트', () => {
  test('역 관리 페이지에 진입한 경우, 지하철 역 이름 입력창에 autoFocus가 되어야 한다.', () => {
    const { container } = render(<StationPage server={mockServer} />);
    const stationInput = container.querySelector('input');

    expect(stationInput).toHaveFocus();
  });
});
