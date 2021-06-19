import { Line, Station } from '../types';

export const DUMMY_STATIONS: Station[] = [
  {
    id: 1,
    name: '지하철역',
  },
  {
    id: 2,
    name: '지하철역',
  },
  {
    id: 3,
    name: '지하철역',
  },
  {
    id: 4,
    name: '지하철역',
  },
  {
    id: 5,
    name: '지하철역',
  },
  {
    id: 6,
    name: '지하철역',
  },
];

export const DUMMY_LINES: Line[] = [
  {
    id: 1,
    name: '신분당선',
    color: '#008888',
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
  {
    id: 2,
    name: '신분당선2',
    color: '#880088',
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
];
