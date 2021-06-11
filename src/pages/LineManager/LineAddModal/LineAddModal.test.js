import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LineAddModal from '.';
import { BUTTON_ID, ERROR, INPUT_TEXT, LINE_COLOR } from '../../../constants';
import { TEST } from '../../../constants/test';

const mockStation1 = { id: 0, name: '죽여줘' };
const mockStation2 = { id: 1, name: '박신영' };
const mockStations = [mockStation1, mockStation2];
const mockLines = [
  {
    id: TEST.MOCK_DATA.ID,
    name: TEST.MOCK_DATA.NAME,
    color: LINE_COLOR.DEFAULT,
    stations: mockStations,
  },
];

describe('<LineAddModal />', () => {
  const mockFn = jest.fn();

  const setup = () => {
    const utils = render(
      <LineAddModal
        stations={mockStations}
        lines={mockLines}
        closeModal={mockFn}
        onClickToClose={mockFn}
        addLine={mockFn}
      />
    );

    const { getByLabelText } = utils;

    const addButton = getByLabelText(BUTTON_ID.LINE_ADD);
    const input = {
      lineName: getByLabelText(INPUT_TEXT.LINE_NAME.LABEL),
      upStation: getByLabelText(INPUT_TEXT.UP_STATION.LABEL),
      downStation: getByLabelText(INPUT_TEXT.DOWN_STATION.LABEL),
      distance: getByLabelText(INPUT_TEXT.DISTANCE.LABEL),
    };

    return {
      ...utils,
      input,
      addButton,
    };
  };

  it('노선 이름에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { input, addButton, getByText } = setup();
    const invalidInputs = [
      { value: '', message: ERROR.LINE_NAME.REQUIRED },
      { value: 'test', message: ERROR.LINE_NAME.REQUIRED },
      { value: TEST.MOCK_DATA.NAME, message: ERROR.LINE_NAME.DUPLICATE },
    ];

    for (const { value, message } of invalidInputs) {
      fireEvent.input(input.lineName, { target: { value } });
      fireEvent.click(addButton);
      await waitFor(() => getByText(message));
    }
  });

  it('노선의 종점에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { input, addButton, getByText } = setup();
    const invalidInputs = [
      { upStation: '', downStation: '', message: ERROR.STATION_ID.REQUIRED },
      {
        upStation: mockStation1.id,
        downStation: '',
        message: ERROR.STATION_ID.REQUIRED,
      },
      {
        upStation: '',
        downStation: mockStation1.id,
        message: ERROR.STATION_ID.REQUIRED,
      },
      {
        upStation: mockStation1.id,
        downStation: mockStation1.id,
        message: ERROR.STATION_ID.DUPLICATE,
      },
    ];

    fireEvent.input(input.lineName, { target: { value: '죽여줘박신영' } });

    for (const { upStation, downStation, message } of invalidInputs) {
      fireEvent.change(input.upStation, { target: { value: upStation } });
      fireEvent.change(input.downStation, { target: { value: downStation } });
      fireEvent.click(addButton);
      await waitFor(() => getByText(message));
    }
  });

  it('노선 거리에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { input, addButton, getByText } = setup();
    const invalidInputs = [
      { value: '', message: ERROR.DISTANCE.REQUIRED },
      { value: 'test', message: ERROR.DISTANCE.INVALID },
      { value: '-100', message: ERROR.DISTANCE.INVALID },
    ];

    fireEvent.input(input.lineName, { target: { value: '죽여줘박신영' } });
    fireEvent.change(input.upStation, { target: { value: mockStation1.id } });
    fireEvent.change(input.downStation, { target: { value: mockStation2.id } });

    for (const { value, message } of invalidInputs) {
      fireEvent.input(input.distance, { target: { value } });
      fireEvent.click(addButton);
      await waitFor(() => getByText(message));
    }
  });
});
