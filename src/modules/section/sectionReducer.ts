import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddSectionRequest, DeleteSectionRequest, LineSection } from '../../interfaces';

type SetLineSectionPayload = LineSection;

export type GetLineSectionPayload = LineSection['id'];

export type AddSectionPayload = AddSectionRequest;

export type DeleteSectionPayload = DeleteSectionRequest;

export type ErrorPayload = string;

interface SectionState {
  lineSection: LineSection;
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
    setLineSection: (state, action: PayloadAction<SetLineSectionPayload>) => {
      state.lineSection = action.payload;
    },
    getLineSectionAsync: (state, action: PayloadAction<GetLineSectionPayload>) => {},
    addSectionAsync: (state, action: PayloadAction<AddSectionPayload>) => {},
    deleteSectionAsync: (state, action: PayloadAction<DeleteSectionPayload>) => {},
    error: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload;
    },
    resetError: state => {
      state.error = '';
    },
    pending: state => {
      state.error = '';
    },
  },
});

export type SectionActions = ReturnType<
  | typeof sectionSlice.actions.setLineSection
  | typeof sectionSlice.actions.getLineSectionAsync
  | typeof sectionSlice.actions.addSectionAsync
  | typeof sectionSlice.actions.deleteSectionAsync
  | typeof sectionSlice.actions.error
  | typeof sectionSlice.actions.resetError
  | typeof sectionSlice.actions.pending
>;

export const { setLineSection, getLineSectionAsync, addSectionAsync, deleteSectionAsync, error, resetError, pending } =
  sectionSlice.actions;
export default sectionSlice.reducer;
