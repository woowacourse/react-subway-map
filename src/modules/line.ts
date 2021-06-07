import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
  isAllOf,
} from "@reduxjs/toolkit";

import {
  Line,
  LineAddRequestItem,
  SectionAddRequestItem,
} from "../@types/types";
import { requestLine } from "../apis/line";
import { requestSection } from "../apis/section";

import {
  isPendingAction,
  isFulfilledAction,
  isRejectedAction,
} from "./@shared/checkThunkActionStatus";

interface LineState {
  items: Line[];
  loading: boolean;
  error: Error | null;
}

const initialState: LineState = {
  items: [],
  loading: false,
  error: null,
};

const isLineAction = (action: AnyAction): action is AnyAction => {
  return action.type.startsWith("[LINE]");
};

const getLines = createAsyncThunk(
  "[LINE] LOAD",
  async (_, { rejectWithValue }) => {
    try {
      const line = await requestLine.getAllLines();

      return line;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addLine = createAsyncThunk(
  "[LINE] ADD",
  async (lineRequestItem: LineAddRequestItem, { rejectWithValue }) => {
    try {
      const line = await requestLine.addLine(lineRequestItem);

      return line;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteLine = createAsyncThunk(
  "[LINE] DELETE",
  async (id: number, { rejectWithValue }) => {
    try {
      await requestLine.deleteLine(id);

      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addSection = createAsyncThunk(
  "[LINE] SECTION_ADD",
  async (sectionAddRequestItem: SectionAddRequestItem, { rejectWithValue }) => {
    try {
      const response = await requestSection.addSection(sectionAddRequestItem);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteSection = createAsyncThunk(
  "[LINE] SECTION_DELETE",
  async (
    { lineId, stationId }: { lineId: number; stationId: number },
    { rejectWithValue }
  ) => {
    try {
      await requestSection.deleteSection({ lineId, stationId });

      return {
        lineId,
        stationId,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const action = {
  getLines,
  addLine,
  deleteLine,
  addSection,
  deleteSection,
};

export const lineSlice = createSlice({
  name: "line",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLines.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loading = false;
      })
      .addMatcher(isAllOf(isLineAction, isFulfilledAction), (state) => {
        state.loading = false;
      })
      .addMatcher(isAllOf(isLineAction, isPendingAction), (state) => {
        state.loading = true;
      })
      .addMatcher(
        isAllOf(isLineAction, isRejectedAction),
        (state, { payload }: PayloadAction<Error>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export default lineSlice.reducer;
