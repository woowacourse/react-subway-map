interface User {
  id: number;
  email: string;
  age: number;
}

interface Station {
  id: number;
  name: string;
  lines?: {
    id: number;
    name: string;
    color: string;
  }[];
}

interface Line {
  id: number;
  name: string;
  color: string;
  stations: {
    id: number;
    name: string;
    distance?: number;
  }[];
}

interface Section {
  id: number;
  upStation: Station;
  downStation: Station;
  distance: number;
}

interface Validation {
  text: string;
  isValid: boolean;
}

export type { User, Station, Line, Section, Validation };
