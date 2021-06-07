import { CIRCLE_COLOR } from "../constants";

interface Line {
  id: number;
  name: string;
  color: keyof typeof CIRCLE_COLOR;
  stations: Station[];
  sections: Section[];
}

interface LineAddRequestItem {
  name: string;
  color: keyof typeof CIRCLE_COLOR;
  upStationId: number;
  downStationId: number;
  distance: number;
}

interface Station {
  id: number;
  name: string;
}

interface Section {
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

interface SectionAddRequestItem {
  lineId: number;
  upStationId: number;
  downStationId: number;
  distance: number;
}

interface LoginInfo {
  email: string;
  password: string;
}

interface SignupInfo {
  email: string;
  password: string;
  age: number;
}

export type {
  Line,
  LineAddRequestItem,
  Station,
  Section,
  SectionAddRequestItem,
  LoginInfo,
  SignupInfo,
};
