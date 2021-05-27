import { CIRCLE_COLOR } from "../constants/color";

export interface Line {
  id: number;
  name: string;
  color: keyof typeof CIRCLE_COLOR;
  stations: Station[];
  sections: Section[];
}

export interface LineAddRequestItem {
  name: string;
  color: keyof typeof CIRCLE_COLOR;
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
  password: string;
  age: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  error: null | Error;
}
