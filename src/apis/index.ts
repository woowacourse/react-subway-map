import axios from "axios";

export enum BASE_URL {
  수리 = "https://suri-subway.kro.kr",
  와일더 = "https://wilder-subway.kro.kr",
  에드 = "https://subway-app.kro.kr",
  포모 = "https://subway-pomo.kro.kr",
}

export const changeBaseUrl = (API: keyof typeof BASE_URL) => {
  localStorage.setItem("API", API);
  axios.defaults.baseURL = BASE_URL[API];
};

changeBaseUrl((localStorage.getItem("API") as keyof typeof BASE_URL) || "수리");
