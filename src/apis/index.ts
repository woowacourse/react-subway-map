export const BASE_URL = {
  수리: "https://suri-subway.kro.kr",
  와일더: "https://wilder-subway.kro.kr",
  에드: "https://subway-app.kro.kr",
  포모: "https://subway-pomo.kro.kr",
} as const;

export type API_PROVIDER = keyof typeof BASE_URL;

export type API_URL = typeof BASE_URL[keyof typeof BASE_URL];

export const API_LOCAL_STORAGE_KEY = "API";

export const DEFAULT_API_PROVIDER = "수리";
