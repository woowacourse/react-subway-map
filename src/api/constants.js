export const BASE_URL = "https://gump-subway.p-e.kr"; // 검프
// export const BASE_URL = "https://fortune-subway.p-e.kr"; // 포츈
// export const BASE_URL = "https://subway.n-e.kr"; // 에어
// export const BASE_URL = "https://bada-subway.kro.kr"; // 바다
// export const BASE_URL = "https://woogie-subway.kro.kr"; // 우기

export const SIGNUP_STATUS_INFO = {
  200: {
    MESSAGE: "로그인에 성공했습니다.",
  },
  201: {
    MESSAGE: "회원가입에 성공했습니다.",
  },
  500: {
    MESSAGE: "중복된 이메일입니다.",
    ERROR_TYPE: "중복된 이메일",
  },
  403: {
    MESSAGE: "장애가 발생했습니다. 관리자에게 문의해주세요.",
    ERROR_TYPE: "url 오류",
  },
  415: {
    MESSAGE: "장애가 발생했습니다. 관리자에게 문의해주세요.",
    ERROR_TYPE: "content-type 오류",
  },
};

export const UNKNOWN_ERROR_MESSAGE =
  "잠시 후 다시 시도해주세요. 에러가 지속될 시 관리자에게 문의해주세요.";

export const ENDPOINT = {
  SIGNUP: "/members",
  LOGIN: "/login/token",
};
