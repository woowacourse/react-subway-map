import { Palette } from './constants/palette';

export interface PageInfo {
  text: string;
  path: string;
}

export interface Station {
  id: number;
  name: string;
  transfer: string[];
}

export interface Section {
  upStation: Station;
  downStation: Station;
  distance: number;
}

export interface Line {
  id: number;
  name: string;
  color: Palette;
  stations: Station[];
  sections: Section[];
}

export interface Member {
  email: string;
  age?: number;
  password: string;
}

export type SetText = (text: string) => void;

export interface BaseInputElement {
  value: string;
}
