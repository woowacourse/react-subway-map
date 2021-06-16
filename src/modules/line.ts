import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
  isAllOf,
  createAction,
} from "@reduxjs/toolkit";

import { lines } from "../apis/lines";
import { sections } from "../apis/sections";

import {
  isPendingAction,
  isFulfilledAction,
  isRejectedAction,
} from "./@shared/checkThunkActionStatus";
import { Line, LineAddRequestItem, SectionAddRequestItem } from "../@types";
import { ERROR_DURATION } from "../constants";

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

const resetError = createAction("[LINE] RESET_ERROR");

const isLineAction = (action: AnyAction): action is AnyAction => {
  return action.type.startsWith("[LINE]");
};

const getLines = createAsyncThunk(
  "[LINE] LOAD",
  async (_, { dispatch, rejectWithValue }) => {
    const response = await lines.getAllLines();

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    return response.result;
  }
);

const addLine = createAsyncThunk(
  "[LINE] ADD",
  async (
    lineRequestItem: LineAddRequestItem,
    { dispatch, rejectWithValue }
  ) => {
    const response = await lines.addLine(lineRequestItem);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    return response.result;
  }
);

const deleteLine = createAsyncThunk(
  "[LINE] DELETE",
  async (id: number, { dispatch, rejectWithValue }) => {
    alert("?");
    const response = await lines.deleteLine(id);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    return response.result;
  }
);

const addSection = createAsyncThunk(
  "[LINE] SECTION_ADD",
  async (
    sectionAddRequestItem: SectionAddRequestItem,
    { dispatch, rejectWithValue }
  ) => {
    const response = await sections.addSection(sectionAddRequestItem);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    return response.result;
  }
);

const deleteSection = createAsyncThunk(
  "[LINE] SECTION_DELETE",
  async (
    { lineId, stationId }: { lineId: number; stationId: number },
    { dispatch, rejectWithValue }
  ) => {
    const response = await sections.deleteSection({ lineId, stationId });

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    return response.result;
  }
);

const action = {
  getLines,
  addLine,
  deleteLine,
  addSection,
  deleteSection,
};

const lineSlice = createSlice({
  name: "line",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLines.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loading = false;
      })
      .addCase(resetError, (state) => {
        state.error = null;
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
export { action, lineSlice };
