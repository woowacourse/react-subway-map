export enum PAGE_PATH {
  HOME = "/",
  LOGIN = "/login",
  SIGN_UP = "/signup",
  STATION_MANAGEMENT = "/station",
  LINE_MANAGEMENT = "/line",
  SECTION_MANAGEMENT = "/section",
  SUBWAY_MANAGEMENT = "/subway",
}

export const navigationLinks = [
  {
    title: "🚉 역 관리",
    link: PAGE_PATH.STATION_MANAGEMENT,
  },
  {
    title: "🛤️ 노선 관리",
    link: PAGE_PATH.LINE_MANAGEMENT,
  },
  {
    title: "🔁 구간 관리",
    link: PAGE_PATH.SECTION_MANAGEMENT,
  },
  {
    title: "🗺️ 전체 보기",
    link: PAGE_PATH.SUBWAY_MANAGEMENT,
  },
  {
    title: "👤 로그인",
    link: PAGE_PATH.LOGIN,
  },
];
