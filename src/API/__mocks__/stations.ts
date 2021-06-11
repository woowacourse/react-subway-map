export const requestGetStations = jest.fn(async () => ({
  data: [
    {
      id: 1,
      name: 'stationNameTest1',
    },
    {
      id: 2,
      name: 'stationNameTest2',
    },
    {
      id: 3,
      name: 'stationNameTest3',
    },
    {
      id: 4,
      name: 'stationNameTest4',
    },
  ],
}));

export const requestAddStation = jest.fn(async () => ({
  data: {
    id: 1000,
    name: 'newStationNameTest',
  },
}));

export const requestDeleteStation = jest.fn(() => Promise.resolve());
