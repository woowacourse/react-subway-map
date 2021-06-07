export const MESSAGE = {
  SIGNUP_SUCCEED: "회원가입에 성공했습니다.",
  LOGIN_SUCCEED: "로그인에 성공했습니다.",
  STATIONS_ADD_SUCCEED: "성공적으로 역이 추가되었습니다.",
  LINES_ADD_SUCCEED: "성공적으로 노선이 추가되었습니다.",
  SECTIONS_ADD_SUCCEED: "성공적으로 구간이 추가되었습니다.",
  UNKNOWN_ERROR:
    "잠시 후 다시 시도해주세요. 에러가 지속될 시 관리자에게 문의해주세요.",
};

export const RESPONSE_CODE = {
  LOGIN: 200,
  READ: 200,
  CREATE: 201,
  DELETE: 204,
};

export const ENDPOINT = {
  SIGNUP: "/members",
  LOGIN: "/login/token",
  STATIONS: "/stations",
  LINES: "/lines",
  LINES_DETAIL: "/lines/detail",
};
