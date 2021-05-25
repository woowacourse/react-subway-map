import { LineInterface } from 'types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'API/API';

export interface AddLinePayload {
  name: string;
  color: string;
  upStationId: number;
  downStationId: number;
  distance: number;
}

interface DeleteLinePayload {
  id: number;
}

export const getLineAsync = createAsyncThunk('line/getLineAsync', async () => {
  try {
    const response = await API.get('/lines');

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const addLineAsync = createAsyncThunk(
  'line/addLineAsync',
  async ({ name, color, upStationId, downStationId, distance }: AddLinePayload) => {
    try {
      const response = await API.post('/lines', { name, color, upStationId, downStationId, distance });

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteLineAsync = createAsyncThunk('line/deleteLineAsync', async ({ id }: DeleteLinePayload) => {
  try {
    await API.delete(`/lines/${id}`);

    return id;
  } catch (error) {
    throw new Error(error);
  }
});

const initialState: { lines: LineInterface[] | null } = {
  lines: null,
};

const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLineAsync.fulfilled, (state, action) => {
      state.lines = action.payload;
    });
    builder.addCase(getLineAsync.rejected, () => {
      throw Error('노선 목록 조회에 실패하였습니다.');
    });
    builder.addCase(addLineAsync.fulfilled, (state, action) => {
      state.lines = state.lines ? state.lines.concat(action.payload) : [action.payload];
    });
    builder.addCase(addLineAsync.rejected, () => {
      throw Error('노선 생성에 실패하였습니다.');
    });
    builder.addCase(deleteLineAsync.fulfilled, (state, action) => {
      state.lines = state.lines?.filter(({ id }) => id !== action.payload) || null;
    });
    builder.addCase(deleteLineAsync.rejected, () => {
      throw Error('노선 삭제에 실패하였습니다.');
    });
  },
});

export default lineSlice.reducer;
