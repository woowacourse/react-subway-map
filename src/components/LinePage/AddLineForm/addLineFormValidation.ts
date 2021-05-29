import { LineState } from '../../../interfaces/line';
import { REGEXP } from '../../../constants/regularExpression';
import { LINE, MESSAGE } from '../../../constants/constant';

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
