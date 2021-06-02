export enum ButtonType {
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
  BLANK = 'BLANK',
  TRANSPARENT = 'TRANSPARENT',
}

export enum ButtonSize {
  LARGE = 'LARGE',
  SMALL = 'SMALL',
}

export interface User {
  id: number;
  email: string;
  age: number;
}

export interface Station {
  id: number;
  name: string;
  includedLines: Line['id'][];
}

export interface Section {
  upStation: Station;
  downStation: Station;
  distance: number;
}

export interface Line {
  id: number;
  name: string;
  color: string;
  extraFare?: number;
  stations: Station[];
  sections: Section[];
}
