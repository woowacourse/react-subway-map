import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddSectionAction,
  DeleteSectionAction,
  ErrorAction,
  GetSectionAction,
  SectionState,
  SetSectionAction,
} from '../../interfaces/section';

const initialState = {
  lineSection: {},
  error: '',
} as SectionState;

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    pending: state => {
      state.error = '';
    },
    error: (state, action: PayloadAction<ErrorAction['payload']>) => {
      state.error = action.payload.error;
    },
    resetError: state => {
      state.error = '';
    },
    setSection: (state, action: PayloadAction<SetSectionAction['payload']>) => {
      state.lineSection = action.payload.lineSection;
    },
    getSectionAsync: (state, action: PayloadAction<GetSectionAction['payload']>) => {},
    addSectionAsync: (state, action: PayloadAction<AddSectionAction['payload']>) => {},
    deleteSectionAsync: (state, action: PayloadAction<DeleteSectionAction['payload']>) => {},
  },
});

export type SectionActions = ReturnType<
  | typeof sectionSlice.actions.pending
  | typeof sectionSlice.actions.error
  | typeof sectionSlice.actions.resetError
  | typeof sectionSlice.actions.setSection
  | typeof sectionSlice.actions.getSectionAsync
  | typeof sectionSlice.actions.addSectionAsync
  | typeof sectionSlice.actions.deleteSectionAsync
>;

export const { setSection, getSectionAsync, addSectionAsync, deleteSectionAsync, error, resetError, pending } =
  sectionSlice.actions;
export default sectionSlice.reducer;
