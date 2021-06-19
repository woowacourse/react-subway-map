import { createSlice } from '@reduxjs/toolkit';
import { SESSION_STORAGE_KEY } from '../constants/storage';
import { setSessionStorageItem } from '../util/sessionStorage';
import { getApiOwner } from './../storage/service';

export const apiOwnerSlice = createSlice({
  name: 'api',
  initialState: {
    owner: getApiOwner(),
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
