import { useInput } from "../../components/@shared/Input/hooks";
import { isValidAge, isValidEmail, isValidPassword } from "./validator";

export const useSignupEmail = () => useInput(isValidEmail);

export const useSignupAge = () => useInput(isValidAge, /[^0-9]/g);

export const useSignupPassword = () => useInput(isValidPassword);
