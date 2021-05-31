import { ERROR_MESSAGE } from '../../constants/messages';
import REGEX from '../../constants/regex';
import { LINE_VALUE } from '../../constants/values';
import { APIReturnTypeLine } from '../../hooks/useLines';

const isLineNameValid = (lineName: string): boolean => {
  return (
    lineName.length >= LINE_VALUE.NAME_MIN_LENGTH &&
    lineName.length <= LINE_VALUE.NAME_MAX_LENGTH &&
    REGEX.KOREAN_DIGIT.test(lineName)
  );
};

const isLineNameDuplicated = (lines: APIReturnTypeLine[], lineName: string): boolean => {
  return lines.some((item) => item.name === lineName);
};

const isStationSelectDuplicated = (upStationId: string, downStationId: string): boolean => {
  return upStationId === downStationId;
};

const isDistanceValid = (distance: string): boolean => {
  return (
    REGEX.ONLY_DIGIT.test(distance) &&
    Number(distance) >= LINE_VALUE.DISTANCE_MIN_VALUE &&
    Number(distance) <= LINE_VALUE.DISTANCE_MAX_VALUE
  );
};

const lineNameErrorMessage = (lines: APIReturnTypeLine[], lineName: string): string => {
  return (
    lineName &&
    (!isLineNameValid(lineName)
      ? ERROR_MESSAGE.INVALID_LINE_INPUT
      : isLineNameDuplicated(lines, lineName)
      ? ERROR_MESSAGE.DUPLICATED_LINE_NAME
      : '')
  );
};

const stationSelectErrorMessage = (upStationId: string, downStationId: string): string => {
  return upStationId && downStationId && isStationSelectDuplicated(upStationId, downStationId)
    ? ERROR_MESSAGE.DUPLICATED_TERMINAL
    : '';
};

const distanceErrorMessage = (distance: string): string => {
  return distance && !isDistanceValid(distance) ? ERROR_MESSAGE.INVALID_DISTANCE : '';
};

const isFormCompleted = (
  lines: APIReturnTypeLine[],
  {
    lineName,
    upStationId,
    downStationId,
    distance,
  }: {
    lineName: string;
    upStationId: string;
    downStationId: string;
    distance: string;
  }
): boolean => {
  return (
    Boolean(lineName) &&
    Boolean(upStationId) &&
    Boolean(downStationId) &&
    Boolean(distance) &&
    isLineNameValid(lineName) &&
    !isLineNameDuplicated(lines, lineName) &&
    !isStationSelectDuplicated(upStationId, downStationId) &&
    isDistanceValid(distance)
  );
};

export { lineNameErrorMessage, stationSelectErrorMessage, distanceErrorMessage, isFormCompleted };
