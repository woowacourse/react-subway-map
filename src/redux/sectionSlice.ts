import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AddSectionPayload {
  id: number;
  upStationId: number;
  downStationId: number;
  distance: number;
}

export const addSectionAsync = createAsyncThunk(
  'section/addSectionAsync',
  async ({ id, upStationId, downStationId, distance }: AddSectionPayload) => {
    try {
      await axios.post(`/lines/${id}/sections`, {
        upStationId,
        downStationId,
        distance,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

const initialState = {};

const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addSectionAsync.rejected, () => {
      throw Error('구간 추가에 실패하였습니다.');
    });
  },
});

export default sectionSlice.reducer;
