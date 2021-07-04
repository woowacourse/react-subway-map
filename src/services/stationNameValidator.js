import { STATION } from '../constants';

const getInputStatus = (name) => {
  if (name.length > STATION.NAME_LENGTH_MAX) {
    return {
      message: STATION.NAME_IS_TOO_LONG,
      isValid: false,
    };
  } else if (name.length < STATION.NAME_LENGTH_MIN) {
    return {
      message: STATION.NAME_IS_TOO_SHORT,
      isValid: false,
    };
  } else if (name.includes(' ')) {
    return {
      message: STATION.NAME_CANNOT_INCLUDE_BLANK,
      isValid: false,
    };
  } else if (name.match(/[a-zA-Z]/)) {
    return {
      message: STATION.NAME_CANNOT_INCLUDE_ENGLISH,
      isValid: false,
    };
  } else if (name.match(/[!@#$%^&*(),.?":{}|<>]/)) {
    return {
      message: STATION.NAME_CANNOT_INCLUDE_SPECIAL_CHARACTER,
      isValid: false,
    };
  }
  return {
    message: '',
    isValid: true,
  };
};

export default getInputStatus;
