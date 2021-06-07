import axios from "axios";

export const BASE_URL = {
  수리: "https://suri-subway.kro.kr",
  와일더: "https://wilder-subway.kro.kr",
  에드: "https://subway-app.kro.kr",
  포모: "https://subway-pomo.kro.kr",
} as const;

export type API = keyof typeof BASE_URL;

export const changeBaseUrl = (API: API) => {
  localStorage.setItem("API", API);
  axios.defaults.baseURL = BASE_URL[API];
};

changeBaseUrl((localStorage.getItem("API") as keyof typeof BASE_URL) || "수리");
