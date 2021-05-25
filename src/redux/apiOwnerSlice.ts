import { API_INFO } from '../constants/api';
import { createSlice } from '@reduxjs/toolkit';

//TODO: owner를 localStorage에 저장해두고 불러와서 초기값 설정
export const apiOwnerSlice = createSlice({
  name: 'api',
  initialState: {
    owner: Object.keys(API_INFO)[1],
  },
  reducers: {
    changeOwner: (state, action) => {
      state.owner = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeOwner } = apiOwnerSlice.actions;

export default apiOwnerSlice.reducer;
