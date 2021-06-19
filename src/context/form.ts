import React, { createContext } from "react";

interface Form {
  values: { [key: string]: string };
  errorMessages: { [key: string]: string | null };
  onChange: React.ChangeEventHandler;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isValid: boolean;
}

const FormContext = createContext<Form | null>(null);

export default FormContext;
