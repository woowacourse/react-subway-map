import { useInput } from "../@shared/Input/hooks";
import { isValidDistance, isValidLineName } from "./validator";

export const useLineNameInput = () =>
  useInput(isValidLineName, /[^ㄱ-ㅎㅏ-ㅣ가-힣0-9]/g);

export const useDistanceInput = () => useInput(isValidDistance, /[^0-9]/g);

export const useColorSelect = () => useInput();
