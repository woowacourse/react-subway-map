import { useRef, useState } from "react";

import FormContext from "../../context/form";
import { Validator } from "../../@types/form";

interface Props {
  children: React.ReactNode;
}

const FormProvider = ({ children }: Props) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [errorMessages, setErrorMessages] = useState<{
    [key: string]: string | null;
  }>({});
  const validators = useRef<{ [key: string]: Validator }>({});

  const isValid = Object.values(errorMessages).filter(Boolean).length === 0;

  const validate = (name: string) => {
    const value = values[name];

    try {
      validators.current[name](value);

      setErrorMessages({ ...errorMessages, [name]: null });
    } catch (error) {
      setErrorMessages({ ...errorMessages, [name]: error.message });
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setValues({ ...values, [name]: value });

    validate(name);
  };

  const register = (name: string, { validator }: { validator: Validator }) => {
    validators.current[name] = validator;
  };

  const unregister = (name: string) => {
    delete validators.current[name];
  };

  return (
    <FormContext.Provider
      value={{ values, errorMessages, onChange, register, unregister, isValid }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
export type { Props };
