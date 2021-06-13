export const validateSectionDistance = (distance: string) => {
  const distanceAsNumber = Number(distance);
  if (distanceAsNumber < 0.1 || distanceAsNumber > 1000) {
    throw Error("구간의 거리는 0.1km 이상, 1000km 이하여야 합니다");
  }
};

export const getSectionDistanceValidator = (maxDistance: number) => (distance: string) => {
  const distanceAsNumber = Number(distance);
  if (distanceAsNumber < 0.1 || distanceAsNumber > 1000) {
    throw Error("구간의 거리는 0.1km 이상, 1000km 이하여야 합니다");
  }

  if (distanceAsNumber >= maxDistance) {
    throw Error("기존의 거리보다 긴 거리를 새로운 구간이 가질 수 없습니다");
  }
};
