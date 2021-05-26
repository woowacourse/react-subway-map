import { createSlice } from '@reduxjs/toolkit';
import { API_INFO } from '../constants/api';
import { SESSION_STORAGE_KEY } from '../constants/storage';
import { getSessionStorageItem, setSessionStorageItem } from './../storage/sessionStorage';

export const apiOwnerSlice = createSlice({
  name: 'api',
  initialState: {
    owner: getSessionStorageItem(SESSION_STORAGE_KEY.API_OWNER) ?? Object.keys(API_INFO)[0],
  },
  reducers: {
    changeOwner: (state, action) => {
      setSessionStorageItem(SESSION_STORAGE_KEY.API_OWNER, action.payload);
      state.owner = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeOwner } = apiOwnerSlice.actions;

export default apiOwnerSlice.reducer;
