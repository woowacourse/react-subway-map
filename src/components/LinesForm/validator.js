export const isValidLineName = (name) => {
  const lineNamePattern = /^[가-힣0-9]{2,10}$/;

  return lineNamePattern.test(name);
};

export const isValidDistance = (distance) => {
  const distancePattern = /^[1-9][0-9]*$/;

  return distancePattern.test(distance);
};
