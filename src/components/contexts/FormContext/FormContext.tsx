/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useReducer } from 'react';
import { ActionType, changeValue, FormState, reducer, resetForm } from './reducer';

interface FormContextProps {
  state: FormState;
  onChange: React.ChangeEventHandler;
  dispatch: React.Dispatch<ActionType>;
  submitFunc: (...args: any[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormContext = createContext<FormContextProps | null>(null);

interface FormContextProviderProps {
  children: React.ReactNode;
  submitFunc: (...args: any[]) => void;
}

export const FormProvider = ({ children, submitFunc }: FormContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {});

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    dispatch(changeValue(name, value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitFunc(state);

    dispatch(resetForm());
  };

  return (
    <FormContext.Provider value={{ state, onChange, onSubmit, submitFunc, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('check FormProvider when use useFormContext');
  }

  return context;
};

export default FormContext;
