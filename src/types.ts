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
