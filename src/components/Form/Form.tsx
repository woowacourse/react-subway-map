import { useState, createContext, FormHTMLAttributes } from "react";

import { Validator } from "../../types/form";

interface Values {
  [key: string]: string;
}

interface Validators {
  [key: string]:
    | ((value: string) => (value: Values) => void | never)
    | Validator;
}

interface Props extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: React.ReactNode;
  submit: (values: Values) => void;
  validators?: Validators;
}

interface FormContextProps {
  values: { [key: string]: string };
  errorMessages: { [key: string]: string | null };
  onChange: React.ChangeEventHandler;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isValid: boolean;
}

export const FormContext = createContext<FormContextProps | null>(null);

const Form = ({ submit, validators, children, ...props }: Props) => {
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
      <form onSubmit={onSubmit} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
