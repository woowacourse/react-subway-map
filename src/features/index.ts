import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import signedUserSlice from './signedUserSlice';
import accessTokenSlice from './accessTokenSlice';
import hostSlice from './hostSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  accessTokenReducer: accessTokenSlice.reducer,
  signedUserReducer: signedUserSlice.reducer,
  hostReducer: hostSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
