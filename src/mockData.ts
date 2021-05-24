import { Station } from './pages/StationPage/StationPage';

const mockStationList: Station[] = [
  {
    id: 1,
    name: '지하철역지하철역지하철역지하철역지하철역',
    editable: false,
  },
  {
    id: 2,
    name: '한티역',
    editable: false,
  },
  {
    id: 3,
    name: '미역',
    editable: false,
  },
  {
    id: 4,
    name: '지하철역지하철역지하철역지하철역지하철역',
    editable: false,
  },
  {
    id: 5,
    name: '한티역',
    editable: false,
  },
];

const mockLineList = [
  {
    id: 1,
    name: '신분당선',
    color: 'red lighten-1',
    stations: [
      { id: 1, name: '강남역' },
      { id: 2, name: '판교역' },
      { id: 3, name: '정자역' },
    ],
  },
  {
    id: 2,
    name: '2호선',
    color: 'green lighten-1',
    stations: [
      { id: 1, name: '강남역' },
      { id: 4, name: '역삼역' },
      { id: 5, name: '잠실역' },
    ],
  },
];
