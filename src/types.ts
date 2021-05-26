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
  color: string;
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
export interface Line {
  id: string;
  name: string;
  color: string;
  stations: Station[];
  sections: Section[];
}
