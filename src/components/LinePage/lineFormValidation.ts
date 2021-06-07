import { LineState } from '../../interfaces/line';
import { REGEXP } from '../../constants/constant';
import { LINE, MESSAGE, SECTION } from '../../constants/constant';

export const getLineNameErrorMessage = (name: string, lines: LineState['lines']) => {
  if (!(LINE.NAME_MIN_LENGTH <= name.length && name.length <= LINE.NAME_MAX_LENGTH)) {
    return MESSAGE.ERROR.LINE.INVALID_NAME_LENGTH;
  }

  if (!(REGEXP.KOR.test(name) || REGEXP.NUMBER.test(name))) {
    return MESSAGE.ERROR.LINE.NOT_KOREAN_AND_NUMBER;
  }

  if (lines.some(line => line.name === name)) {
    return MESSAGE.ERROR.LINE.REGISTERED_LINE;
  }

  return '';
};

export const getLineStationErrorMessage = (upStationId: number, downStationId: number) => {
  if (!upStationId || !downStationId) {
    return MESSAGE.ERROR.SECTION.SHOULD_CHOOSE_STATION;
  }

  if (upStationId === downStationId) {
    return MESSAGE.ERROR.SECTION.SAME_STATIONS;
  }

  return '';
};

export const getLineDistanceErrorMessage = (distance: number) => {
  if (isNaN(distance)) {
    return MESSAGE.ERROR.SECTION.DISTANCE_NOT_A_NUMBER;
  }
  if (distance < SECTION.DISTANCE) {
    return MESSAGE.ERROR.SECTION.INVALID_DISTANCE;
  }

  return '';
};

export const getLineColorErrorMessage = (color: string, lines: LineState['lines']) => {
  if (!color) {
    return MESSAGE.ERROR.SECTION.SHOULD_CHOOSE_COLOR;
  }

  if (lines.some(line => line.color === color)) {
    return MESSAGE.ERROR.SECTION.REGISTERED_COLOR;
  }

  return '';
};
