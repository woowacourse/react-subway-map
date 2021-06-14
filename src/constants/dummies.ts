import { Line, Station } from '../types';
import { Palette } from './palette';

export const DUMMY_STATIONS: Station[] = [
  {
    id: 1,
    name: '지하철역',
    transfer: [],
  },
  {
    id: 2,
    name: '지하철역',
    transfer: [],
  },
  {
    id: 3,
    name: '지하철역',
    transfer: [],
  },
  {
    id: 4,
    name: '지하철역',
    transfer: [],
  },
  {
    id: 5,
    name: '지하철역',
    transfer: [],
  },
  {
    id: 6,
    name: '지하철역',
    transfer: [],
  },
];

export const DUMMY_LINES: Line[] = [
  {
    id: 1,
    name: '신분당선',
    color: Palette.CYAN_400,
    stations: [
      {
        id: 1,
        name: '강남역',
        transfer: [],
      },
      {
        id: 2,
        name: '광교역',
        transfer: [],
      },
    ],
    sections: [
      {
        upStation: {
          id: 1,
          name: '강남역',
          transfer: [],
        },
        downStation: {
          id: 2,
          name: '광교역',
          transfer: [],
        },
        distance: 10,
      },
    ],
  },
  {
    id: 2,
    name: '신분당선2',
    color: Palette.GREEN_400,
    stations: [
      {
        id: 1,
        name: '강남역',
        transfer: [],
      },
      {
        id: 2,
        name: '광교역',
        transfer: [],
      },
    ],
    sections: [
      {
        upStation: {
          id: 1,
          name: '강남역',
          transfer: [],
        },
        downStation: {
          id: 2,
          name: '광교역',
          transfer: [],
        },
        distance: 10,
      },
    ],
  },
];
