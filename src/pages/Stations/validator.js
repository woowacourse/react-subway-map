const isValidStationName = (value) => {
  const rStationName = /^[가-힣0-9]{2,20}$/;

  return rStationName.test(value);
};

export default isValidStationName;
