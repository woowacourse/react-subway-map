export interface Line {
  id: number;
  name: string;
  color: string;
}

export interface AddLineRequest {
  name: string;
  color: string;
  upStationId: string;
  downStationId: string;
  distance: string;
}
