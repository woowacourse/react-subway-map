import { createContext } from "react";

import { Validator } from "../@types/form";

interface Form {
  values: { [key: string]: string };
  errorMessages: { [key: string]: string | null };
  onChange: React.ChangeEventHandler;
  register: (
    name: string,
    {
      validator,
    }: {
      validator: Validator;
    }
  ) => void;
  unregister: (name: string) => void;
  isValid: boolean;
}

const FormContext = createContext<Form | null>(null);

export default FormContext;
