import axios from "axios";

export enum BASE_URL {
  수리 = "https://suri-subway.kro.kr",
  와일더 = "https://wilder-subway.kro.kr",
  에드 = "https://subway-app.kro.kr",
  포모 = "https://subway-pomo.kro.kr",
}

export const changeBaseUrl = (범인: keyof typeof BASE_URL) => {
  localStorage.setItem("범인", 범인);
  axios.defaults.baseURL = BASE_URL[범인];
};

changeBaseUrl((localStorage.getItem("범인") as keyof typeof BASE_URL) || "수리");
