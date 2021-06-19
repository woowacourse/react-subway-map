import { AnyAction } from "@reduxjs/toolkit";

import { Line } from "../../@types";

const isLineAction = (action: AnyAction): action is AnyAction => {
  return action.type.startsWith("[LINE]");
};

interface LineState {
  items: Line[];
  loading: boolean;
  error: Error | null;
}
export { isLineAction };
export type { LineState };
