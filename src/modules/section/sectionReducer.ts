import { AddSectionPayload } from './../../interfaces/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LineSection } from '../../interfaces';

interface SetSectionAction {
  lineSection: LineSection;
}

interface SectionState {
  lineSection: LineSection;
  error: string;
}

export interface ErrorAction {
  error: string;
}

const initialState = {
  lineSection: {},
  error: '',
} as SectionState;

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<SetSectionAction>) => {
      state.lineSection = action.payload.lineSection;
    },
    getSectionAsync: (state, action: PayloadAction<{ id: LineSection['id'] }>) => {},
    addSectionAsync: (state, action: PayloadAction<AddSectionPayload>) => {},
    error: (state, action: PayloadAction<ErrorAction>) => {
      state.error = action.payload.error;
    },
    pending: state => {
      state.error = '';
    },
  },
});

export type SectionActions = ReturnType<
  | typeof sectionSlice.actions.setSection
  | typeof sectionSlice.actions.getSectionAsync
  | typeof sectionSlice.actions.addSectionAsync
  | typeof sectionSlice.actions.error
  | typeof sectionSlice.actions.pending
>;

export const { setSection, getSectionAsync, addSectionAsync, error, pending } = sectionSlice.actions;
export default sectionSlice.reducer;
