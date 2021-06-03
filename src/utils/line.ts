import { Line, Station } from "../@types/types";

export const isLineHasStation = (line: Line, stationId: Station["id"]) => {
  return line.stations.some((station) => station.id === stationId);
};
