const isValidStationName = (value) => {
  const stationNamePattern = /^[가-힣0-9]{2,20}$/;

  return stationNamePattern.test(value);
};

export default isValidStationName;
