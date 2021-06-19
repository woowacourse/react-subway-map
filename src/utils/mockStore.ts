import { AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { RootState } from "../modules";

const middlewares = [thunk];

const mockStore = configureMockStore<
  RootState,
  ThunkDispatch<RootState, any, AnyAction>
>(middlewares);

export default mockStore;
