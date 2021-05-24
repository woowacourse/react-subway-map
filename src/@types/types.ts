import { CIRCLE_COLOR } from "../constants/color";

export interface Line {
  id: number;
  name: string;
  color: keyof typeof CIRCLE_COLOR;
  stations: Station[];
  sections: Section[];
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
