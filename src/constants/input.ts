const INPUT = {
  DISTANCE: {
    MIN: '1',
    MAX: String(Number.MAX_SAFE_INTEGER),
  },
  EXTRA_FARE: {
    MIN: '0',
    MAX: String(Number.MAX_SAFE_INTEGER),
  },
  AGE: {
    MIN: '1',
    MAX: String(Number.MAX_SAFE_INTEGER),
  },
  PASSWORD: {
    MIN_LENGTH: 6,
  },
  STATION_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
  },
  LINE_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 10,
  },
};

export default INPUT;
