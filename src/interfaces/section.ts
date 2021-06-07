import { HTTPResponse } from '.';
import {
  addSectionAsync,
  deleteSectionAsync,
  error,
  getSectionAsync,
  setSection,
} from '../modules/section/sectionReducer';
import { LineState } from './line';

interface SectionSectionState {
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

interface SectionStationState {
  id: number;
  name: string;
  transferLines: LineState['lines'];
}

export interface SectionState {
  lineSection: {
    id: number;
    color: string;
    name: string;
    stations: SectionStationState[];
    sections: SectionSectionState[];
  };
  error: HTTPResponse<null>['message'];
}

// saga
export interface SetSectionAction {
  type: typeof setSection;
  payload: {
    lineSection: SectionState['lineSection'];
  };
}
export interface GetSectionAction {
  type: typeof getSectionAsync;
  payload: {
    id: SectionState['lineSection']['id'];
  };
}
export interface AddSectionAction {
  type: typeof addSectionAsync;
  payload: {
    lineId: string;
    upStationId: string;
    downStationId: string;
    distance: string;
  };
}
export interface DeleteSectionAction {
  type: typeof deleteSectionAsync;
  payload: {
    lineId: string;
    stationId: string;
  };
}

export interface ErrorAction {
  type: typeof error;
  payload: {
    error: HTTPResponse<null>['message'];
  };
}

export interface GetSectionResult {
  lineSection: SectionState['lineSection'];
}

export interface AddSectionResult {}

export interface DeleteSectionResult {}
