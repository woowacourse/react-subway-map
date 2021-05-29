import { MESSAGE } from '../../constants/constant';
import { SectionState } from '../../interfaces/section';

export const getLineErrorMessage = (lineId: string) => {
  if (!lineId) {
    return MESSAGE.ERROR.LINE.CHOOSE_LINE;
  }

  return '';
};

export const getStationsErrorMessage = (
  lineSection: SectionState['lineSection'],
  upStationId: string,
  downStationId: string
) => {
  if (Object.keys(lineSection).length === 0) {
    return MESSAGE.ERROR.LINE.CHOOSE_LINE_FIRST;
  }

  if (!upStationId || !downStationId) {
    return MESSAGE.ERROR.LINE.CHOOSE_STATIONS;
  }

  if (upStationId === downStationId) {
    return MESSAGE.ERROR.LINE.CHOOSE_LINE_FIRST;
  }

  const hasUpStationInLine = lineSection.stations.some(({ id }) => String(id) === upStationId);
  const hasDownStationInLine = lineSection.stations.some(({ id }) => String(id) === downStationId);

  if (hasUpStationInLine ? hasDownStationInLine : !hasDownStationInLine) {
    return MESSAGE.ERROR.LINE.SHOULD_ONLY_ONE_STATION_REGISTERED;
  }

  return '';
};

export const getDistanceErrorMessage = (
  lineSection: SectionState['lineSection'],
  upStationId: string,
  downStationId: string,
  distance: number
) => {
  if (isNaN(distance)) {
    return MESSAGE.ERROR.SECTION.DISTANCE_NOT_A_NUMBER;
  }
  if (distance < 1) {
    return MESSAGE.ERROR.SECTION.INVALID_DISTANCE;
  }

  if (Object.keys(lineSection).length === 0) {
    return MESSAGE.ERROR.LINE.CHOOSE_LINE_FIRST;
  }

  if (!upStationId || !downStationId) {
    return MESSAGE.ERROR.SECTION.SHOULD_CHOOSE_STATION;
  }

  const hasUpStationInLine = lineSection.stations.some(({ id }) => String(id) === upStationId);
  const hasDownStationInLine = lineSection.stations.some(({ id }) => String(id) === downStationId);
  if (hasUpStationInLine ? hasDownStationInLine : !hasDownStationInLine) {
    return MESSAGE.ERROR.LINE.SHOULD_ONLY_ONE_STATION_REGISTERED;
  }

  const stationStandard = hasUpStationInLine ? 'upStation' : 'downStation';
  if (
    lineSection.sections.some(({ upStation, downStation, distance: currentDistance }) => {
      return (
        (stationStandard === 'upStation'
          ? String(upStation.id) === upStationId
          : String(downStation.id) === downStationId) && currentDistance <= distance
      );
    })
  ) {
    return MESSAGE.ERROR.SECTION.SHOULD_SMALLER_DISTANCE;
  }

  return '';
};
