const isValidStationName = (value) => {
  const stationNameRegex = /^[가-힣0-9]{2,20}$/;

  return stationNameRegex.test(value);
};

export default isValidStationName;
