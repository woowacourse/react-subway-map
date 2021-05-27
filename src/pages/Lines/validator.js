export const isValidLineName = (name) => {
  const rLineName = /^[가-힣0-9]{2,10}$/;

  return rLineName.test(name);
};

export const isValidDistance = (distance) => {
  const rDistance = /^[1-9][0-9]*$/;

  return rDistance.test(distance);
};
