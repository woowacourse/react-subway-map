import { Line, Station, Section } from './index';

export interface MapStation {
  id: Station['id'];
  name: Station['name'];
  distance: Section['distance'];
  transferLines: Line[];
}

export interface MapLine {
  id: Line['id'];
  name: Line['name'];
  color: Line['color'];
  stations: MapStation[];
}

export type MapData = MapLine[];
