import { combineReducers } from 'redux';

import signedUserSlice from './signedUserSlice';
import accessTokenSlice from './accessTokenSlice';
import hostSlice from './hostSlice';

const rootReducer = combineReducers({
  accessTokenReducer: accessTokenSlice.reducer,
  signedUserReducer: signedUserSlice.reducer,
  hostReducer: hostSlice.reducer,
});

export default rootReducer;
