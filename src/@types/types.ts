import { CIRCLE_COLOR, CIRCLE_COLOR_CODE } from "../constants/color";

export interface Line {
  id: number;
  name: string;
  color: CIRCLE_COLOR_CODE;
  stations: Station[];
  sections: Section[];
}

export interface LineAddRequestItem {
  name: string;
  color: CIRCLE_COLOR_CODE;
  upStationId: number;
  downStationId: number;
  distance: number;
}

export interface Station {
  id: number;
  name: string;
}

export interface Section {
  upStation: {
    id: number;
    name: string;
  };
  downStation: {
    id: number;
    name: string;
  };
  distance: number;
}

export interface SubwayMapItem {
  id: number;
  name: string;
  color: CIRCLE_COLOR_CODE;
  sections: Section[];
}

export interface SectionAddRequestItem {
  lineId: number;
  upStationId: number;
  downStationId: number;
  distance: number;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface SignupInfo {
  email: string;
  age: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  error: null | Error;
}
