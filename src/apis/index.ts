import axios from "axios";

import { requestAuth } from "./user";
import { requestStation } from "./station";
import { requestLine } from "./line";
import { requestSection } from "./section";

enum BASE_URL {
  에드 = "https://subway-app.kro.kr",
  수리 = "https://suri-subway.kro.kr",
  와일더 = "https://wilder-subway.kro.kr",
  포모 = "https://subway-pomo.kro.kr",
}

const changeBaseUrl = (범인: keyof typeof BASE_URL) => {
  localStorage.setItem("범인", 범인);
  axios.defaults.baseURL = BASE_URL[범인];
};

export { requestAuth, requestStation, requestLine, requestSection };

export { BASE_URL, changeBaseUrl };
