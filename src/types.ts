export interface StationInterface {
  id: number;
  name: string;
}

export interface LineInterface {
  id: number;
  name: string;
  color: string;
  stations: StationInterface[];
}

export interface SelectedLineInterface {
  id: number;
  name: string;
  color: string;
  stations: StationInterface[];
  sections: SectionInterface[];
}
export interface SectionInterface {
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
