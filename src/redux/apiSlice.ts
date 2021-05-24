import { API_INFO } from './../constants/api';
import { createSlice } from '@reduxjs/toolkit';

//TODO: owner를 localStorage에 저장해두고 불러와서 초기값 설정
export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    owner: Object.keys(API_INFO)[0],
  },
  reducers: {
    changeOwner: (state, action) => {
      state.owner = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeOwner } = apiSlice.actions;

export default apiSlice.reducer;
