import { AsyncThunk } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const isPendingAction = (action: AnyAction): action is PendingAction => {
  return action.type.endsWith("/pending");
};

export const isFulfilledAction = (
  action: AnyAction
): action is FulfilledAction => {
  return action.type.endsWith("fulfilled");
};

export const isRejectedAction = (
  action: AnyAction
): action is RejectedAction => {
  return action.type.endsWith("rejected");
};
