import { LineInterface } from 'types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'API/API';

export const getLineAsync = createAsyncThunk('line/getLineAsync', async () => {
  try {
    const response = await API.get('/lines');

    return response.data;
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
  },
});

export default lineSlice.reducer;
