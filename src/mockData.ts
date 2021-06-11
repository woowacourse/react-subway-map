const mockAccessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjIyMDMzMjkxLCJleHAiOjE2MjIwMzY4OTF9.-M7TyMMvXk-y5-kIoPP4crTt6Nnvv8ubREKKZjO5d7A';

const mockStationList = [
  {
    id: 1,
    name: '지하철역지하철역지하철역지하철역지하철역',
    lines: [
      {
        id: 1,
        name: '신분당선',
        color: 'RED',
      },
    ],
  },
  {
    id: 2,
    name: '한티역',
    lines: [],
  },
  {
    id: 3,
    name: '미역',
    lines: [],
  },
  {
    id: 4,
    name: '지하철역지하철역지하철역지하철역지하철역',
    lines: [],
  },
  {
    id: 5,
    name: '한티역',
    lines: [],
  },
];

const mockLineList = [
  {
    id: 1,
    name: '신분당선',
    color: 'RED',
    stations: [
      { id: 1, name: '강남역', distance: 10 },
      { id: 2, name: '판교역', distance: 10 },
      { id: 3, name: '정자역' },
    ],
  },
  {
    id: 2,
    name: '2호선',
    color: 'GREEN',
    stations: [
      { id: 1, name: '강남역', distance: 10 },
      { id: 4, name: '역삼역', distance: 10 },
      { id: 5, name: '잠실역' },
    ],
  },
];

export { mockAccessToken, mockStationList, mockLineList };
