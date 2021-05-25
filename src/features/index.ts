import { combineReducers } from 'redux';

import signedUserSlice from './signedUserSlice';
import accessTokenSlice from './accessTokenSlice';

const rootReducer = combineReducers({
  accessTokenReducer: accessTokenSlice.reducer,
  signedUserReducer: signedUserSlice.reducer,
});

export default rootReducer;
