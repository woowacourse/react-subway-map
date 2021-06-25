import { useState } from "react";

import FormContext from "../../context/form";
import { Validator } from "../../@types/form";

interface Values {
  [key: string]: string;
}

interface Validators {
  [key: string]:
    | ((value: string) => (value: Values) => void | never)
    | Validator;
}

interface Props {
  children: React.ReactNode;
  submit: (values: Values) => void;
  validators?: Validators;
}

const FormProvider = ({ submit, validators, children }: Props) => {
  const [values, setValues] = useState<Values>({});
  const [errorMessages, setErrorMessages] = useState<{
    [key: string]: string | null;
  }>({});

  const isValid = Object.values(errorMessages).filter(Boolean).length === 0;

  const validate = (name: string, value: string) => {
    const validator = validators?.[name];
    if (!validator) return;

    try {
      const func = validator(value);
      if (typeof func === "function") {
        func(values);
      }

      setErrorMessages({ ...errorMessages, [name]: null });
    } catch (error) {
      setErrorMessages({ ...errorMessages, [name]: error.message });
    }

    return;
  };

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target }) => {
    const { name, value, tagName } = target;

    setValues({ ...values, [name]: value });

    if (tagName !== "SELECT") validate(name, value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!isValid) return;

    submit(values);
  };

  return (
    <FormContext.Provider
      value={{ values, errorMessages, onChange, onSubmit, isValid }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
