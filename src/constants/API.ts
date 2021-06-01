export const QUERY = {
  REQUEST_LINES: 'requestLines',
  REQUEST_STATIONS: 'requestStations',
};

export const URL = {
  BETTER: 'https://subway-fare-mission.kro.kr',
  KEVIN: 'https://jipark.p-e.kr',
  MUNGTO: 'https://mungto-subway.o-r.kr',
  PIKA: 'https://pika-subway-fare.kro.kr',
};

export type APIName = keyof URL;
