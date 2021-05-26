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
  | typeof sectionSlice.actions.error
  | typeof sectionSlice.actions.pending
>;

export const { setSection, getSectionAsync, error, pending } = sectionSlice.actions;
export default sectionSlice.reducer;
