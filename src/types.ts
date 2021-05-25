export enum ButtonType {
  FILLED = 'FILLED',
  BLANK = 'BLANK',
}

export enum ButtonSize {
  LARGE = 'LARGE',
  SMALL = 'SMALL',
}

export interface Station {
  id: number;
  name: string;
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
