import { VALIDATION } from '../../constants/constant';
import { LineSection } from '../../interfaces';

export const getLineErrorMessage = (lineId: string) => {
  if (!lineId) {
    return '구간을 생성할 노선을 선택해주세요.';
  }

  return null;
};

export const getStationsErrorMessage = (lineSection: LineSection, upStationId: string, downStationId: string) => {
  if (Object.keys(lineSection).length === 0) {
    return '노선을 먼저 선택해주세요.';
  }

  if (!upStationId || !downStationId) {
    return '상행역과 하행역을 모두 선택해주세요.';
  }

  if (upStationId === downStationId) {
    return '상행역과 하행역은 동일할 수 없습니다.';
  }

  const hasUpStationInLine = lineSection.stations.some(({ id }) => String(id) === upStationId);
  const hasDownStationInLine = lineSection.stations.some(({ id }) => String(id) === downStationId);

  if (hasUpStationInLine ? hasDownStationInLine : !hasDownStationInLine) {
    return '상행역과 하행역 둘 중에 하나의 역만 기존 노선에 등록되어 있어야합니다.';
  }

  return null;
};

export const getDistanceErrorMessage = (
  lineSection: LineSection,
  upStationId: string,
  downStationId: string,
  distance: number
) => {
  if (isNaN(distance)) {
    return '노선의 거리는 숫자여야 합니다.';
  }
  if (distance < VALIDATION.MIN_DISTANCE) {
    return `노선의 거리는 최소 ${VALIDATION.MIN_DISTANCE}km 이상이여야 합니다.`;
  }

  if (Object.keys(lineSection).length === 0) {
    return '노선을 먼저 선택해주세요.';
  }

  if (!upStationId || !downStationId) {
    return '상행역과 하행역을 먼저 선택해주시기 바랍니다.';
  }

  const hasUpStationInLine = lineSection.stations.some(({ id }) => String(id) === upStationId);
  const hasDownStationInLine = lineSection.stations.some(({ id }) => String(id) === downStationId);
  if (hasUpStationInLine ? hasDownStationInLine : !hasDownStationInLine) {
    return '올바른 상행역과 하행역을 먼저 선택해주시기 바랍니다.';
  }

  const stationStandard = hasUpStationInLine ? 'upStation' : 'downStation';
  let standardDistance;
  const isLongerThanStandardDistance = lineSection.sections.some(
    ({ upStation, downStation, distance: currentDistance }) => {
      if (
        (stationStandard === 'upStation'
          ? String(upStation.id) === upStationId
          : String(downStation.id) === downStationId) &&
        currentDistance <= distance
      ) {
        standardDistance = currentDistance;
        return true;
      }
      return false;
    }
  );

  if (isLongerThanStandardDistance) {
    return `해당 구역의 거리(${standardDistance}km)보다 긴 거리를 등록할 수 없습니다.`;
  }

  return null;
};
