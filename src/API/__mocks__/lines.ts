import { Palette } from '../../constants/palette';

export const requestGetLines = jest.fn(async () => ({
  data: [
    {
      id: 1,
      name: '신분당선',
      color: Palette.RED_400,
      stations: [
        {
          id: 1,
          name: '강남역',
        },
        {
          id: 2,
          name: '광교역',
        },
      ],
      sections: [
        {
          upStation: {
            id: 1,
            name: '강남역',
          },
          downStation: {
            id: 2,
            name: '광교역',
          },
          distance: 10,
        },
      ],
    },
  ],
}));

export const requestAddLine = jest.fn(async () => ({
  data: {
    id: 2,
    name: '새로운역',
    color: Palette.ORANGE_400,
    stations: [
      {
        id: 1,
        name: '강남역',
      },
      {
        id: 2,
        name: '광교역',
      },
    ],
    sections: [
      {
        upStation: {
          id: 1,
          name: '강남역',
        },
        downStation: {
          id: 2,
          name: '광교역',
        },
        distance: 10,
      },
    ],
  },
}));

export const requestModifyLine = jest.fn(() => Promise.resolve());

export const requestDeleteLine = jest.fn(() => Promise.resolve());
