import { REGEXP } from '../../constants/regularExpression';
import { VALIDATION } from '../../constants/validation';
import { Line } from '../../interfaces';

export const getLineNameErrorMessage = (name: string, lines: Line[]) => {
  if (!(VALIDATION.MIN_LINE_NAME_LENGTH <= name.length && name.length <= VALIDATION.MAX_LINE_NAME_LENGTH)) {
    return `노선 이름은 최소 ${VALIDATION.MIN_LINE_NAME_LENGTH}글자 이상 ${VALIDATION.MAX_LINE_NAME_LENGTH}글자 이하여야 합니다.`;
  }

  if (!(REGEXP.KOR.test(name) || REGEXP.NUMBER.test(name))) {
    return '노선 이름은 한글과 숫자만 입력할 수 있습니다.';
  }

  if (lines.some(line => line.name === name)) {
    return '이미 존재하는 노선 이름입니다.';
  }

  return null;
};

export const getLineStationErrorMessage = (upStationId: number, downStationId: number) => {
  if (!upStationId || !downStationId) {
    return '상행 종점역과 하행 종점역을 선택해주세요.';
  }

  if (upStationId === downStationId) {
    return '상행 종점역과 하행 종점역은 동일할 수 없습니다.';
  }

  return null;
};

export const getLineDistanceErrorMessage = (distance: number) => {
  if (isNaN(distance)) {
    return '노선의 거리는 숫자여야 합니다.';
  }
  if (distance < VALIDATION.MIN_DISTANCE) {
    return `노선의 거리는 최소 ${VALIDATION.MIN_DISTANCE}km 이상이여야 합니다.`;
  }

  return null;
};

export const getLineColorErrorMessage = (color: string, lines: Line[]) => {
  if (!color) {
    return '노선 색상을 선택해주세요.';
  }

  if (lines.some(line => line.color === color)) {
    return '이미 노선에 등록된 색상입니다.\n다른 색상을 선택해주세요.';
  }

  return null;
};
