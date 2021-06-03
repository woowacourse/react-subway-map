import { API_URL } from './constants/API';
import { lineColors } from './constants/service';

export type FlexDirection = 'horizontal' | 'vertical';

export type ModalSize = 'small' | 'medium' | 'large';

export interface SignUpForm {
  email: string;
  age: number;
  password: string;
  passwordForValidation: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface StationForm {
  name: string;
}

export type StationId = number;

export interface Station extends StationForm {
  id: StationId;
}

export interface LineForm {
  name: string;
  color: LineColor;
  upStationId: StationId;
  downStationId: StationId;
  distance: number;
}

export interface SectionForm {
  upStationId: StationId;
  downStationId: StationId;
  distance: number;
}

export interface Section {
  upStation: Station;
  downStation: Station;
  distance: number;
}

export type LineColor = typeof lineColors[number];

export type LineId = number;

export interface Line {
  id: LineId;
  name: string;
  color: LineColor;
  stations: Station[];
}

export interface LineDetail extends Line {
  stations: Station[];
  sections: Section[];
}

export type APIName = keyof typeof API_URL;
