import { ERROR_MESSAGE } from '../../constants/messages';
import REGEX from '../../constants/regex';
import { SECTION_VALUE } from '../../constants/values';
import { APIReturnTypeLine } from '../../hooks/useLines';

const isOnlyOneStationInCurrentLine = (
  currentLine: APIReturnTypeLine,
  upStationId: string,
  downStationId: string
): boolean => {
  return Boolean(
    Number(currentLine?.stations.some(({ id }) => id === Number(upStationId))) ^
      Number(currentLine?.stations.some(({ id }) => id === Number(downStationId)))
  );
};

const isStationSelectDuplicated = (upStationId: string, downStationId: string): boolean => {
  return upStationId === downStationId;
};

const isDistanceValid = (distance: string): boolean => {
  return (
    REGEX.ONLY_DIGIT.test(distance) &&
    Number(distance) >= SECTION_VALUE.DISTANCE_MIN_VALUE &&
    Number(distance) <= SECTION_VALUE.DISTANCE_MAX_VALUE
  );
};

const stationSelectErrorMessage = (
  currentLine: APIReturnTypeLine,
  upStationId: string,
  downStationId: string
): string => {
  if (!Boolean(upStationId) || !Boolean(downStationId)) return '';

  if (!isStationSelectDuplicated(upStationId, downStationId)) {
    if (isOnlyOneStationInCurrentLine(currentLine, upStationId, downStationId)) {
      return '';
    }
    return ERROR_MESSAGE.ONLY_ONE_STATION_INCLUDED;
  }

  return ERROR_MESSAGE.DUPLICATED_TERMINAL;
};

const distanceErrorMessage = (distance: string): string => {
  return distance && !isDistanceValid(distance) ? ERROR_MESSAGE.INVALID_DISTANCE : '';
};

const isFormCompleted = (
  currentLine: APIReturnTypeLine,
  {
    upStationId,
    downStationId,
    distance,
  }: { upStationId: string; downStationId: string; distance: string }
): boolean => {
  return (
    Boolean(upStationId) &&
    Boolean(downStationId) &&
    Boolean(distance) &&
    !isStationSelectDuplicated(upStationId, downStationId) &&
    isDistanceValid(distance) &&
    isOnlyOneStationInCurrentLine(currentLine, upStationId, downStationId)
  );
};

export { stationSelectErrorMessage, distanceErrorMessage, isFormCompleted };
