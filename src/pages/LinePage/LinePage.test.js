import React from 'react';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, within } from 'test/test-util';
import { stationHandlers, lineHandlers } from 'test/handlers';
import { lines as linesData } from 'test/mockData';
import LinePage from '.';

const server = setupServer(...lineHandlers, ...stationHandlers);

describe('LinePage 테스트', () => {
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => true);
    server.listen();
  });

  beforeEach(() => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const setup = () => {
    const utils = render(<LinePage />);
    const { getByTestId } = utils;
    const lineList = getByTestId('line-list');

    return {
      ...utils,
      lineList,
    };
  };

  it('노선 목록을 불러온다.', async () => {
    const { lineList, getAllByTestId } = setup();
    expect(lineList).toBeInTheDocument();

    const lines = getAllByTestId('line-item');
    expect(lines).toHaveLength(linesData.length);
  });

  it('새로운 노선을 추가할 수 있다.', async () => {
    const { getAllByTestId, getByRole, getByText } = setup();

    const addLineButton = getByRole('button', { name: /노선 추가/i });
    fireEvent.click(addLineButton);

    const lineNameInput = getByRole('textbox', { name: /노선 이름/i });
    fireEvent.change(lineNameInput, { target: { value: '2호선' } });

    const upStation = getByRole('combobox', { name: /상행 종점/i });
    fireEvent.change(upStation, { target: { value: 3 } });

    const downStation = getByRole('combobox', { name: /하행 종점/i });
    fireEvent.change(downStation, { target: { value: 5 } });

    const distanceInput = getByRole('spinbutton', { name: /거리/i });
    fireEvent.change(distanceInput, { target: { value: 10 } });

    const extraFareInput = getByRole('spinbutton', { name: /운임/i });
    fireEvent.change(extraFareInput, { target: { value: 200 } });

    const color = getAllByTestId('color-option')[5];
    fireEvent.click(color);

    const submitButton = getByRole('button', { name: /확인/i });
    fireEvent.click(submitButton);

    const newLine = await waitFor(() => getByText(/2호선/i));
    expect(newLine).toBeInTheDocument();
  });

  it('노선을 삭제할 수 있다.', async () => {
    const { getByText, container } = setup();
    const targetLine = await waitFor(() => getByText(/2호선/i));
    const deleteButton = within(targetLine).getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(container).toHaveTextContent('노선을 삭제했습니다.'));
    expect(targetLine).not.toBeInTheDocument();
  });
});
