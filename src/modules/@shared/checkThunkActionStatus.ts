import { AsyncThunk } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

const isPendingAction = (action: AnyAction): action is PendingAction => {
  return action.type.endsWith("/pending");
};

const isFulfilledAction = (action: AnyAction): action is FulfilledAction => {
  return action.type.endsWith("fulfilled");
};

const isRejectedAction = (action: AnyAction): action is RejectedAction => {
  return action.type.endsWith("rejected");
};

export { isPendingAction, isFulfilledAction, isRejectedAction };
