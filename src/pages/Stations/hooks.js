import { useInput } from "../../components/@shared/Input/hooks";
import isValidStationName from "./validator";

export const useStationName = () =>
  useInput(isValidStationName, /[^가-힣0-9]/g);
