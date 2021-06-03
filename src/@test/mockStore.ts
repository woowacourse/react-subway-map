import { AnyAction } from "redux";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { RootState } from "../modules";

const mockStore = configureMockStore<RootState, ThunkDispatch<RootState, any, AnyAction>>([thunk]);

export default mockStore;
