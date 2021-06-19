const validateSectionDistance = (distance: string) => {
  const distanceAsNumber = Number(distance);
  if (distanceAsNumber < 0.1 || distanceAsNumber > 1000) {
    throw Error("구간의 거리는 0.1km 이상, 1000km 이하여야 합니다");
  }
};

export { validateSectionDistance };
