export const LOGIN = {
  SUCCEED: '로그인에 성공하였습니다.',
  FAIL: '로그인에 실패하였습니다.',
};

export const LOGOUT = {
  SUCCEED: '로그아웃 되었습니다.',
};

export const SIGN_UP = {
  SUCCEED: '회원가입에 성공하였습니다.',
  FAIL: '회원가입에 실패하였습니다.',

  EMAIL_SHOULD_INCLUDE_ID: '아이디 포함해서 입력해주세요.',
  EMAIL_CANNOT_INCLUDE_BLANK: '이메일에 공백이 포함되지 않도록 입력해주세요.',
  EMAIL_CANNOT_INCLUDE_KOREAN: '이메일에 한글이 포함되지 않도록 입력해주세요.',
  EMAIL_SHOULD_BE_IN_VALID_FORMAT: '유효한 이메일 형식으로 입력해주세요.',

  MIN_AGE: 1,
  MAX_AGE: 200,

  AGE_SHOULD_BE_IN_RANGE: '1 ~ 200 사이의 나이를 입력해주세요.',
  AGE_CANNOT_INCLUDE_BLANK: '나이에 공백이 포함되지 않도록 입력해주세요.',
  AGE_SHOULD_BE_IN_NUMBER: '숫자로만 입력해주세요.',

  PASSWORD_LENGTH_MIN: 6,
  PASSWORD_LENGTH_MAX: 15,

  PASSWORD_SHOULD_BE_IN_RANGE: '6 ~ 15자의 영문+숫자 조합으로 입력해주세요.',
  PASSWORD_CANNOT_INCLUDE_BLANK: '공백이 포함되지 않도록 입력해주세요.',
  PASSWORD_SHOULD_INCLUDE_ENGLISH: '영문을 포함해서 입력해주세요.',
  PASSWORD_SHOULD_INCLUDE_NUMBER: '숫자를 포함해서 입력해주세요.',
  PASSWORD_SHOULD_BE_ONLY_ENGLISH_AND_NUMBER: '영문 또는 숫자로만 입력해주세요.',
};

export const STATION = {
  NAME_LENGTH_MIN: 2,
  NAME_LENGTH_MAX: 20,

  NAME_IS_TOO_SHORT: '역 이름은 2글자 이상으로 작성해주세요.',
  NAME_IS_TOO_LONG: '역 이름은 20글자 이내로 작성해주세요.',
  NAME_CANNOT_INCLUDE_BLANK: '역 이름은 공백 없이 작성해주세요.',
  NAME_CANNOT_INCLUDE_ENGLISH: '역 이름은 영문 글자 없이 작성해주세요.',
  NAME_CANNOT_INCLUDE_SPECIAL_CHARACTER: '역 이름은 특수문자 없이 작성해주세요.',

  ADD_SUCCEED: '역 추가에 성공하였습니다.',
  ADD_FAIL: '역 추가에 실패하였습니다.',
  DELETE_SUCCEED: '역 삭제에 성공하였습니다.',
  DELETE_FAIL: '역 삭제에 실패하였습니다.',
};

export const LINE = {
  NAME_LENGTH_MIN: 2,
  NAME_LENGTH_MAX: 10,

  ADD_SUCCEED: '노선 추가에 성공하였습니다.',
  ADD_FAIL: '노선 추가에 실패하였습니다.',
  DELETE_SUCCEED: '노선 삭제에 성공하였습니다.',
  DELETE_FAIL: '노선 삭제에 실패하였습니다',
};

export const SECTION = {
  ADD_SUCCEED: '구간 추가에 성공하였습니다.',
  ADD_FAIL: '구간 추가에 실패하였습니다.',
  DELETE_SUCCEED: '구간 삭제에 성공하였습니다.',
  DELETE_FAIL: '구간 삭제에 실패하였습니다.',
};
