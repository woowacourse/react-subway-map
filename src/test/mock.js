export const stations = [
  {
    id: 1,
    name: '노량진역',
  },
  {
    id: 2,
    name: '노들역',
  },
  {
    id: 3,
    name: '흑석역',
  },
  {
    id: 4,
    name: '동작역',
  },
  {
    id: 5,
    name: '구반포역',
  },
];

export const lines = [
  {
    id: 1,
    name: '9호선',
    color: '#9ca3af',
    extraFare: 1200,
    stations: [
      {
        id: 1,
        name: '노량진역',
      },
      {
        id: 2,
        name: '노들역',
      },
      {
        id: 3,
        name: '흑석역',
      },
    ],
    sections: [
      {
        upStation: {
          id: 1,
          name: '노량진역',
        },
        downStation: {
          id: 2,
          name: '노들역',
        },
        distance: 4,
      },
    ],
  },
  {
    id: 2,
    name: '분당선',
    color: '#f87171',
    extraFare: 1600,
    stations: [
      {
        id: 3,
        name: '흑석역',
      },
      {
        id: 4,
        name: '동작역',
      },
      {
        id: 5,
        name: '구반포역',
      },
    ],
    sections: [
      {
        upStation: {
          id: 3,
          name: '흑석역',
        },
        downStation: {
          id: 4,
          name: '동작역',
        },
        distance: 3,
      },
    ],
  },
];
