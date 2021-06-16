import {
  Login,
  Logout,
  Signup,
  StationManagement,
  LineManagement,
  SectionManagement,
  SubwayMap,
} from "../pages";

import { RouteShape, NavLinkShape } from "../@types/route";

enum PAGE_PATH {
  HOME = "/",
  LOGIN = "/login",
  LOGOUT = "/logout",
  SIGN_UP = "/signup",
  STATION_MANAGEMENT = "/station",
  LINE_MANAGEMENT = "/line",
  SECTION_MANAGEMENT = "/section",
  SUBWAY_MANAGEMENT = "/subway",
}

const NAV_LINKS: NavLinkShape[] = [
  {
    isPrivate: true,
    to: PAGE_PATH.STATION_MANAGEMENT,
    title: "🚉 역 관리",
  },
  {
    isPrivate: true,
    to: PAGE_PATH.LINE_MANAGEMENT,
    title: "🛤️ 노선 관리",
  },
  {
    isPrivate: true,
    to: PAGE_PATH.SECTION_MANAGEMENT,
    title: "🔁 구간 관리",
  },
  {
    isPrivate: true,
    to: PAGE_PATH.SUBWAY_MANAGEMENT,
    title: "🗺️ 전체 보기",
  },
  {
    isPrivate: false,
    to: PAGE_PATH.LOGIN,
    title: "👤 로그인",
  },
  {
    isPrivate: true,
    to: PAGE_PATH.LOGOUT,
    title: "👤 로그아웃",
  },
];

const ROUTES: RouteShape[] = [
  {
    isPrivate: false,
    path: PAGE_PATH.LOGIN,
    Component: Login,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.LOGOUT,
    Component: Logout,
  },
  {
    isPrivate: false,
    path: PAGE_PATH.SIGN_UP,
    Component: Signup,
  },
  {
    isPrivate: true,
    path: [PAGE_PATH.HOME, PAGE_PATH.STATION_MANAGEMENT],
    Component: StationManagement,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.LINE_MANAGEMENT,
    Component: LineManagement,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.SECTION_MANAGEMENT,
    Component: SectionManagement,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.SUBWAY_MANAGEMENT,
    Component: SubwayMap,
  },
];

export { PAGE_PATH, NAV_LINKS, ROUTES };
