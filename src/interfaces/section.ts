import { Line } from './line';

interface LineSectionStation {
  id: number;
  name: string;
  transferLines: Line[];
}

export interface Section {
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

export interface LineSection {
  id: number;
  color: string;
  name: string;
  stations: LineSectionStation[];
  sections: Section[];
}

export interface AddSectionRequest {
  lineId: string;
  upStationId: string;
  downStationId: string;
  distance: string;
}

export interface DeleteSectionRequest {
  lineId: string;
  stationId: string;
}
