export const SIGNUP_SUCCEED = {
  CODE: 201,
  MESSAGE: "회원가입에 성공했습니다.",
};

export const LOGIN_SUCCEED = {
  CODE: 200,
  MESSAGE: "로그인에 성공했습니다.",
};

export const STATIONS_ADD_SUCCEED = {
  CODE: 201,
  MESSAGE: "성공적으로 역이 추가되었습니다.",
};

export const STATIONS_GET_SUCCEED = {
  CODE: 200,
};

export const STATIONS_DELETE_SUCCEED = {
  CODE: 204,
};

export const LINES_ADD_SUCCEED = {
  CODE: 201,
  MESSAGE: "성공적으로 노선이 추가되었습니다.",
};

export const LINES_GET_SUCCEED = {
  CODE: 200,
};

export const UNKNOWN_ERROR_MESSAGE =
  "잠시 후 다시 시도해주세요. 에러가 지속될 시 관리자에게 문의해주세요.";

export const ENDPOINT = {
  SIGNUP: "/members",
  LOGIN: "/login/token",
  STATIONS: "/stations",
  LINES: "/lines",
};
