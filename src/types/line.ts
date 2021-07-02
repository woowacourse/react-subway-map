import { Station } from "./station";

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

export interface Section {
  upStation: Station;
  downStation: Station;
  distance: number;
}

export interface SectionAddRequestItem {
  lineId: number;
  upStationId: number;
  downStationId: number;
  distance: number;
}
