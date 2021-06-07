import { LineInterface, SelectedLineInterface } from 'types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import MESSAGE from 'constants/message';

export interface AddLinePayload {
  name: string;
  color: string;
  upStationId: number;
  downStationId: number;
  distance: number;
}
interface GetLinePayload {
  id: number;
}

interface DeleteLinePayload {
  id: number;
}

export const getSelectedLineAsync = createAsyncThunk('line/getSelectedLineAsync', async ({ id }: GetLinePayload) => {
  const response = await axios.get(`/lines/${id}`);

  return response.data;
});

export const getLinesAsync = createAsyncThunk('line/getLinesAsync', async () => {
  const response = await axios.get('/lines');

  return response.data;
});

export const addLineAsync = createAsyncThunk(
  'line/addLineAsync',
  async ({ name, color, upStationId, downStationId, distance }: AddLinePayload) => {
    const response = await axios.post('/lines', { name, color, upStationId, downStationId, distance });

    return response.data;
  }
);

export const deleteLineAsync = createAsyncThunk('line/deleteLineAsync', async ({ id }: DeleteLinePayload) => {
  await axios.delete(`/lines/${id}`);

  return id;
});

const initialState: {
  selectedLine: SelectedLineInterface | null;
  lines: LineInterface[] | null;
} = {
  selectedLine: null,
  lines: null,
};

const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
    clearSelectedLIne: (state) => {
      state.selectedLine = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSelectedLineAsync.fulfilled, (state, action) => {
      state.selectedLine = action.payload;
    });
    builder.addCase(getSelectedLineAsync.rejected, () => {
      throw Error(MESSAGE.LINE.GET_FAIL);
    });
    builder.addCase(getLinesAsync.fulfilled, (state, action) => {
      state.lines = action.payload;
    });
    builder.addCase(getLinesAsync.rejected, () => {
      throw Error(MESSAGE.LINE.GET_LIST_FAIL);
    });
    builder.addCase(addLineAsync.fulfilled, (state, action) => {
      state.lines = state.lines ? state.lines.concat(action.payload) : [action.payload];
    });
    builder.addCase(addLineAsync.rejected, () => {
      throw Error(MESSAGE.LINE.ADD_FAIL);
    });
    builder.addCase(deleteLineAsync.fulfilled, (state, action) => {
      state.lines = state.lines?.filter(({ id }) => id !== action.payload) || null;
    });
    builder.addCase(deleteLineAsync.rejected, () => {
      throw Error(MESSAGE.LINE.DELETE_FAIL);
    });
  },
});

export const { clearSelectedLIne } = lineSlice.actions;

export default lineSlice.reducer;
