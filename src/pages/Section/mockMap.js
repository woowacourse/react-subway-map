export const mockMap = [
  {
    id: 1,
    name: '1호선',
    color: '#A5BAE2',
    distance: '60',
    sections: [
      {
        id: 1,
        name: '수원역',
        distanceToNextStation: '10',
        transferLines: [{ id: 8, name: '분당선', color: '#FFDF94' }],
      },
      {
        id: 2,
        name: '화서역',
        distanceToNextStation: '10',
        transferLines: [],
      },
      {
        id: 3,
        name: '성균관대역',
        distanceToNextStation: '10',
        transferLines: [],
      },
      {
        id: 4,
        name: '의왕역',
        distanceToNextStation: '10',
        transferLines: [],
      },
      {
        id: 5,
        name: '당정역',
        distanceToNextStation: '10',
        transferLines: [],
      },
      {
        id: 6,
        name: '군포역',
        distanceToNextStation: '10',
        transferLines: [],
      },
      {
        id: 7,
        name: '금정역',
        distanceToNextStation: '0',
        transferLines: [],
      },
    ],
  },
  {
    id: 2,
    name: '분당선',
    color: '#FFDF94',
    distance: '60',
    sections: [
      {
        id: 8,
        name: '수원역',
        distanceToNextStation: '10',
        transferLines: [{ id: 1, name: '1호선', color: '#A5BAE2' }],
      },
      {
        id: 9,
        name: '매교역',
        distanceToNextStation: '10',
        transferLines: [],
      },
      {
        id: 10,
        name: '수원시청역',
        distanceToNextStation: '10',
        transferLines: [],
      },
      {
        id: 11,
        name: '매탄권선역',
        distanceToNextStation: '10',
        transferLines: [],
      },
      {
        id: 12,
        name: '망포역',
        distanceToNextStation: '10',
        transferLines: [],
      },
      {
        id: 13,
        name: '영통역',
        distanceToNextStation: '10',
        transferLines: [],
      },
      {
        id: 14,
        name: '청명역',
        distanceToNextStation: '0',
        transferLines: [],
      },
    ],
  },
];
