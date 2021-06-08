import { ERROR, RANGE, REG_EXP } from '../constants';

export const validateEmail = ({ email }) => {
  if (!email) {
    return ERROR.EMAIL.REQUIRED;
  }
  if (!REG_EXP.EMAIL.test(email)) {
    return ERROR.EMAIL.INVALID;
  }

  return '';
};

export const validateAge = ({ age }) => {
  if (!age) {
    return ERROR.AGE.REQUIRED;
  }
  if (!REG_EXP.NUMBER.test(age)) {
    return ERROR.AGE.INVALID;
  }
  if (age <= RANGE.AGE.MIN || age >= RANGE.AGE.MAX) {
    return ERROR.AGE.INVALID;
  }

  return '';
};

export const validatePassword = ({ password }) => {
  if (!password) {
    return ERROR.PASSWORD.REQUIRED;
  }
  if (!REG_EXP.PASSWORD.test(password)) {
    return ERROR.PASSWORD.INVALID;
  }

  return '';
};

export const validatePasswordConfirm = ({ password, passwordConfirm }) => {
  if (!passwordConfirm) {
    return ERROR.PASSWORD_CONFIRM.REQUIRED;
  }
  if (password !== passwordConfirm) {
    return ERROR.PASSWORD_CONFIRM.INVALID;
  }

  return '';
};

export const validateStationName = ({ stationName, stations }) => {
  if (!stationName) {
    return ERROR.STATION_NAME.REQUIRED;
  }
  if (!REG_EXP.STATION_NAME.test(stationName)) {
    return ERROR.STATION_NAME.INVALID;
  }
  if (stations.find(({ name }) => name === stationName)) {
    return ERROR.STATION_NAME.DUPLICATE;
  }

  return '';
};

export const validateLineName = ({ lineName, lines }) => {
  if (!lineName) {
    return ERROR.LINE_NAME.REQUIRED;
  }
  if (!REG_EXP.LINE_NAME.test(lineName)) {
    return ERROR.LINE_NAME.INVALID;
  }
  if (lines.find(({ name }) => name === lineName)) {
    return ERROR.LINE_NAME.DUPLICATE;
  }

  return '';
};

export const validateStationId = ({ upStationId, downStationId }) => {
  if (!upStationId || !downStationId) {
    return ERROR.STATION_ID.REQUIRED;
  }
  if (upStationId === downStationId) {
    return ERROR.STATION_ID.DUPLICATE;
  }

  return '';
};

export const validateDistance = ({ distance }) => {
  if (!distance) {
    return ERROR.DISTANCE.REQUIRED;
  }
  if (!REG_EXP.NUMBER.test(distance)) {
    return ERROR.DISTANCE.INVALID;
  }
  if (distance <= 0) {
    return ERROR.DISTANCE.INVALID;
  }

  return '';
};
