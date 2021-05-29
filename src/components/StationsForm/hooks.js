import { useInput } from "../@shared/Input/hooks";
import isValidStationName from "./validator";

export const useStationName = () =>
  useInput(isValidStationName, /[^ㄱ-ㅎㅏ-ㅣ가-힣0-9]/g);
