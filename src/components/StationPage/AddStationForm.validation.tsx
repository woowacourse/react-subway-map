import { VALIDATION } from '../../constants/constant';
import { REGEXP } from '../../constants/regularExpression';
import { Station } from '../../interfaces';

export const getStationNameErrorMessage = (name: string, stations: Station[]) => {
  if (!(VALIDATION.MIN_STATION_NAME_LENGTH <= name.length && name.length <= VALIDATION.MAX_STATION_NAME_LENGTH)) {
    return `역 이름은 최소 ${VALIDATION.MIN_STATION_NAME_LENGTH}글자 이상 ${VALIDATION.MAX_STATION_NAME_LENGTH}글자 이하여야 합니다.`;
  }

  if (!(REGEXP.KOR.test(name) || REGEXP.NUMBER.test(name))) {
    return '역 이름은 한글과 숫자만 입력할 수 있습니다.';
  }

  if (stations.some(station => station.name === name)) {
    return '이미 존재하는 역 이름입니다.';
  }

  return null;
};
