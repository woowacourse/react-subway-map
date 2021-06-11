import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SectionAddModal from '.';
import { BUTTON_ID, ERROR, INPUT_TEXT, LINE_COLOR } from '../../../constants';
import { TEST } from '../../../constants/test';

const mockStation1 = { id: 0, name: '죽여줘' };
const mockStation2 = { id: 1, name: '박신영' };
const mockStations = [mockStation1, mockStation2];
const mockLine = {
  id: TEST.MOCK_DATA.ID,
  name: TEST.MOCK_DATA.NAME,
  color: LINE_COLOR.DEFAULT,
  stations: [mockStation1, mockStation2],
};

describe('<SectionAddModal />', () => {
  const mockFn = jest.fn();

  const setup = () => {
    const utils = render(
      <SectionAddModal
        stations={mockStations}
        line={mockLine}
        closeModal={mockFn}
        onClickToClose={mockFn}
        addSection={mockFn}
      />
    );

    const { getByLabelText } = utils;

    const addButton = getByLabelText(BUTTON_ID.SECTION_ADD);
    const input = {
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

  it('구간의 역에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
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

    for (const { upStation, downStation, message } of invalidInputs) {
      fireEvent.change(input.upStation, { target: { value: upStation } });
      fireEvent.change(input.downStation, { target: { value: downStation } });
      fireEvent.click(addButton);
      await waitFor(() => getByText(message));
    }
  });

  it('구간 거리에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { input, addButton, getByText } = setup();
    const invalidInputs = [
      { value: '', message: ERROR.DISTANCE.REQUIRED },
      { value: 'test', message: ERROR.DISTANCE.INVALID },
      { value: '-100', message: ERROR.DISTANCE.INVALID },
    ];

    fireEvent.change(input.upStation, { target: { value: mockStation1.id } });
    fireEvent.change(input.downStation, { target: { value: mockStation2.id } });

    for (const { value, message } of invalidInputs) {
      fireEvent.input(input.distance, { target: { value } });
      fireEvent.click(addButton);
      await waitFor(() => getByText(message));
    }
  });
});
