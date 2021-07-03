import { AnyAction } from "@reduxjs/toolkit";

import { Station } from "../../types/station";

const isStationAction = (action: AnyAction): action is AnyAction => {
  return action.type.startsWith("[STATION]");
};

interface StationState {
  items: Station[];
  loading: boolean;
  error: Error | null;
}

export { isStationAction };
export type { StationState };
