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
