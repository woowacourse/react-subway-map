import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddSectionRequest, DeleteSectionRequest, LineSection } from '../../interfaces';

interface SetLineSectionPayload {
  lineSection: LineSection;
}

export interface GetLineSectionPayload {
  id: LineSection['id'];
}

export interface AddSectionPayload {
  section: AddSectionRequest;
}

export interface DeleteSectionPayload {
  section: DeleteSectionRequest;
}
export interface ErrorAction {
  error: string;
}

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
      state.lineSection = action.payload.lineSection;
    },
    getLineSectionAsync: (state, action: PayloadAction<GetLineSectionPayload>) => {},
    addSectionAsync: (state, action: PayloadAction<AddSectionPayload>) => {},
    deleteSectionAsync: (state, action: PayloadAction<DeleteSectionPayload>) => {},
    error: (state, action: PayloadAction<ErrorAction>) => {
      state.error = action.payload.error;
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
