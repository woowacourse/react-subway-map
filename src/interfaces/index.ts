// export interface StationLines {
//   id: number;
//   name: string;
//   color: string;
// }

// export interface Station {
//   id: number;
//   name: string;
//   lines: StationLines[];
// }

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

interface LineSectionTransferLine {
  id: number;
  name: string;
  color: string;
}
interface LineSectionStation {
  id: number;
  name: string;
  transferLines: LineSectionTransferLine[];
}

interface Section {
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

export interface AddSectionPayload {
  lineId: string;
  upStationId: string;
  downStationId: string;
  distance: string;
}

export interface DeleteSectionPayload {
  lineId: string;
  stationId: string;
}
