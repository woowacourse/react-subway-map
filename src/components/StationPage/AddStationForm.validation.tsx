import { REGEXP } from '../../constants/regularExpression';
import { Station } from '../../interfaces';

export const getStationNameErrorMessage = (name: string, stations: Station[]) => {
  if (!(2 <= name.length && name.length <= 20)) {
    return '역 이름은 최소 2글자 이상 20글자 이하여야 합니다.';
  }

  if (!(REGEXP.KOR.test(name) || REGEXP.NUMBER.test(name))) {
    return '역 이름은 한글과 숫자만 입력할 수 있습니다.';
  }

  if (stations.some(station => station.name === name)) {
    return '이미 존재하는 역 이름입니다.';
  }

  return '';
};
