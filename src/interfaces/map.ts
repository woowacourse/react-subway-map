import { LineState } from './line';

interface SectionStationState {
  id: number;
  name: string;
  transferLines: LineState['lines'];
}

export interface MapState {
  id: number;
  name: string;
  color: string;
  stations: SectionStationState[];
}
