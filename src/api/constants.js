// export const BASE_URL = "https://gump-subway.p-e.kr"; // 검프
// export const BASE_URL = "https://fortune-subway.p-e.kr"; // 포츈
// export const BASE_URL = "https://subway.n-e.kr"; // 에어
export const BASE_URL = "https://bada-subway.kro.kr"; // 바다
// export const BASE_URL = "https://woogie-subway.kro.kr"; // 우기

export const SIGNUP_SUCCEED = {
  CODE: 201,
  MESSAGE: "회원가입에 성공했습니다.",
};

export const LOGIN_SUCCEED = {
  CODE: 200,
  MESSAGE: "로그인에 성공했습니다.",
};

export const UNKNOWN_ERROR_MESSAGE =
  "잠시 후 다시 시도해주세요. 에러가 지속될 시 관리자에게 문의해주세요.";

export const ENDPOINT = {
  SIGNUP: "/members",
  LOGIN: "/login/token",
};
