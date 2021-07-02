import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LineAddRequestItem, SectionAddRequestItem } from "../../types/line";
import { lines, sections } from "../../apis";
import { ERROR_DURATION } from "../../constants/time";

const resetError = createAction("[LINE] RESET_ERROR");

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

export { getLines, addLine, deleteLine, addSection, deleteSection, resetError };
