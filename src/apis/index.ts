import axios from "axios";

import { auth } from "./auth";
import { stations } from "./stations";
import { lines } from "./lines";
import { sections } from "./sections";

const BASE_URL = {
  에드: "https://subway-app.kro.kr",
  수리: "https://suri-subway.kro.kr",
  와일더: "https://wilder-subway.kro.kr",
  포모: "https://subway-pomo.kro.kr",
} as const;

const changeBaseUrl = (범인: keyof typeof BASE_URL) => {
  localStorage.setItem("범인", 범인);
  axios.defaults.baseURL = BASE_URL[범인];
};

export { auth, stations, lines, sections };

export { BASE_URL, changeBaseUrl };
