export interface Page {
  text: string;
  path: string;
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
  stations: Station[];
  sections: Section[];
}

export interface Member {
  email: string;
  age?: number;
  password: string;
}
