import REGEX from '../../constants/regex';
import { STATION_VALUE } from '../../constants/values';
import { APIReturnTypeStation } from '../../hooks/useStations';

const isStationInputValid = (stationInput: string): boolean => {
  return (
    stationInput.length >= STATION_VALUE.NAME_MIN_LENGTH &&
    stationInput.length <= STATION_VALUE.NAME_MAX_LENGTH &&
    REGEX.KOREAN_DIGIT.test(stationInput)
  );
};

const isStationInputDuplicated = (
  stations: APIReturnTypeStation[],
  stationInput: string
): boolean => {
  return stations.some((item) => item.name === stationInput);
};

export { isStationInputValid, isStationInputDuplicated };
