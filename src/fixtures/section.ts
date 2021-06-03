import initialState from "./redux";

const [firstLine] = initialState.line.items;
const [lastStationInLine] = firstLine.stations.slice(-1);
const [otherStation] = initialState.station.items.slice(-1);

export enum TEST_SECTION {
  UP_STATION_ID = lastStationInLine.id,
  DOWN_STATION_ID = otherStation.id,
  DISTANCE = 10,
}
