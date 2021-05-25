import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ERROR } from '../constants';
import { request } from '../utils';

export const getStationsThunk = createAsyncThunk(
  'subway/getStationsThunk',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await request.get('/stations');

      return { stations: response.data };
    } catch (error) {
      console.error(error);

      return rejectWithValue({ error: ERROR.UNKNOWN });
    }
  }
);

const subwaySlice = createSlice({
  name: 'subway',
  initialState: {
    stations: [],
    error: null, //TODO: 사용자에게 에러 보여줄 방법 고민하기
  },
  reducers: {},
  extraReducers: {
    [getStationsThunk.fulfilled]: (state, { payload: { stations } }) => {
      state.stations = stations;
    },
    [getStationsThunk.rejected]: (state, { payload: { error } }) => {
      state.error = error;
    },
  },
});

const subwayReducer = subwaySlice.reducer;

export default subwayReducer;
