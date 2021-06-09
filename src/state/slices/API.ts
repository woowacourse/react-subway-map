import { createSlice } from '@reduxjs/toolkit';

interface APIState {
  APIName: string;
}

const name = 'api';

const initialState: APIState = {
  APIName: '',
};

const APISlice = createSlice({
  name,
  initialState,
  reducers: {
    setName(state, { payload }: { payload: string }) {
      state.APIName = payload;
    },
  },
});

export const { actions: APIAction } = APISlice;

export default APISlice.reducer;
