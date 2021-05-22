export interface IStation {
  id: number;
  name: string;
}

export interface ILine {
  id: number;
  name: string;
  upStationId: number;
  downStationId: number;
  distance: number;
}
