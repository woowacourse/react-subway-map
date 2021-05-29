export const USER_LIST = [
  {
    id: 1,
    email: 'test@test.com',
    password: 'testtest',
  },
];

export const STATION_LIST = [
  {
    id: 1,
    name: '잠실',
  },
  {
    id: 2,
    name: '동대문문화역사공원',
  },
  {
    id: 3,
    name: '사당',
  },
  {
    id: 4,
    name: '강남',
  },
  {
    id: 5,
    name: '교대',
  },
  {
    id: 6,
    name: '이수',
  },
  {
    id: 7,
    name: '종합운동장',
  },
  {
    id: 8,
    name: '시청',
  },
  {
    id: 9,
    name: '서울역',
  },
  {
    id: 10,
    name: '충정로',
  },
  {
    id: 11,
    name: '서대문',
  },
  {
    id: 12,
    name: '충무로',
  },
  {
    id: 13,
    name: '천호',
  },
];

export const LINE_LIST = [
  {
    id: 1,
    name: '1호선',
    color: 'rgb(59, 130, 246)',
    stations: [
      {
        id: 8,
        name: '시청',
        distance: 3,
        transferLines: [
          {
            id: 2,
            name: '2호선',
            color: 'rgb(16, 185, 129)',
          },
        ],
      },
      {
        id: 9,
        name: '서울역',
        transferLines: [
          {
            id: 4,
            name: '4호선',
            color: 'rgb(191, 219, 254)',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '2호선',
    color: 'rgb(16, 185, 129)',
    stations: [
      {
        id: 10,
        name: '충정로',
        distance: 4,
        transferLines: [
          {
            id: 5,
            name: '5호선',
            color: 'rgb(139, 92, 246)',
          },
        ],
      },
      {
        id: 8,
        name: '시청',
        distance: 15,
        transferLines: [
          {
            id: 1,
            name: '1호선',
            color: 'rgb(59, 130, 246)',
          },
        ],
      },
      {
        id: 2,
        name: '동대문문화역사공원',
        distance: 20,
        transferLines: [
          {
            id: 4,
            name: '4호선',
            color: 'rgb(191, 219, 254)',
          },
          {
            id: 5,
            name: '5호선',
            color: 'rgb(139, 92, 246)',
          },
        ],
      },
      {
        id: 1,
        name: '잠실',
        distance: 3,
      },
      {
        id: 7,
        name: '종합운동장',
        distance: 8,
      },
      {
        id: 4,
        name: '강남',
        distance: 5,
      },
      {
        id: 5,
        name: '교대',
        distance: 7,
        transferLines: [
          {
            id: 3,
            name: '3호선',
            color: 'rgb(237, 137, 54)',
          },
        ],
      },
      {
        id: 3,
        name: '사당',
        transferLines: [
          {
            id: 2,
            name: '2호선',
            color: 'rgb(16, 185, 129)',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: '3호선',
    color: 'rgb(237, 137, 54)',
    stations: [
      {
        id: 12,
        name: '충무로',
        distance: 20,
        transferLines: [
          {
            id: 4,
            name: '4호선',
            color: 'rgb(191, 219, 254)',
          },
        ],
      },
      {
        id: 5,
        name: '교대',
        transferLines: [
          {
            id: 2,
            name: '2호선',
            color: 'rgb(16, 185, 129)',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: '4호선',
    color: 'rgb(191, 219, 254)',
    stations: [
      {
        id: 2,
        name: '동대문문화역사공원',
        distance: 10,
        transferLines: [
          {
            id: 2,
            name: '2호선',
            color: 'rgb(16, 185, 129)',
          },
          {
            id: 5,
            name: '5호선',
            color: 'rgb(139, 92, 246)',
          },
        ],
      },
      {
        id: 12,
        name: '충무로',
        distance: 14,
        transferLines: [
          {
            id: 3,
            name: '3호선',
            color: 'rgb(237, 137, 54)',
          },
        ],
      },
      {
        id: 6,
        name: '이수',
        distance: 9,
      },
      {
        id: 3,
        name: '사당',
        transferLines: [
          {
            id: 2,
            name: '2호선',
            color: 'rgb(16, 185, 129)',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: '5호선',
    color: 'rgb(139, 92, 246)',
    stations: [
      {
        id: 11,
        name: '서대문',
        distance: 16,
      },
      {
        id: 2,
        name: '동대문문화역사공원',
        distance: 37,
        transferLines: [
          {
            id: 2,
            name: '2호선',
            color: 'rgb(16, 185, 129)',
          },
          {
            id: 5,
            name: '5호선',
            color: 'rgb(139, 92, 246)',
          },
        ],
      },
      {
        id: 13,
        name: '천호',
      },
    ],
  },
];
