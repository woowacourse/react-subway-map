import { MESSAGE, STATION } from '../../constants/constant';
import { REGEXP } from '../../constants/constant';
import { StationState } from '../../interfaces/station';

export const getStationNameErrorMessage = (name: string, stations: StationState['stations']) => {
  if (!(STATION.NAME_MIN_LENGTH <= name.length && name.length <= STATION.NAME_MAX_LENGTH)) {
    return MESSAGE.ERROR.STATION.INVALID_STATION_LENGTH;
  }

  if (!(REGEXP.KOR.test(name) || REGEXP.NUMBER.test(name))) {
    return MESSAGE.ERROR.STATION.NOT_KOREAN_AND_NUMBER;
  }

  if (stations.some(station => station.name === name)) {
    return MESSAGE.ERROR.STATION.REGISTERED_STATION;
  }

  return '';
};
