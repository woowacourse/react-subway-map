import { AnyAction } from "@reduxjs/toolkit";

const isAuthAction = (action: AnyAction): action is AnyAction => {
  return action.type.startsWith("[AUTH]");
};

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
}

export { isAuthAction };
export type { AuthState };
