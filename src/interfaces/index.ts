export interface StationLines {
  id: number;
  name: string;
  color: string;
}

export interface Station {
  id: number;
  name: string;
  lines: StationLines[];
}

export interface Line {
  id: number;
  name: string;
  color: string;
}

export interface AddLine {
  name: string;
  color: string;
  upStationId: string;
  downStationId: string;
  distance: string;
}
