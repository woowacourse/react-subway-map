export const isValidLineName = (name) => {
  const lineNameRegex = /^[가-힣0-9]{2,10}$/;

  return lineNameRegex.test(name);
};

export const isValidDistance = (distance) => {
  const distanceRegex = /^[1-9][0-9]*$/;

  return distanceRegex.test(distance);
};
