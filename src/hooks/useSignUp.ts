import { ChangeEvent, FormEvent, useState } from 'react';

interface SignUpForm {
  email: string;
  age: number;
  password: string;
  passwordForValidation: string;
}

const useSignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    email: '',
    age: 0,
    password: '',
    passwordForValidation: '',
  });

  const setEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: event.target.value });
  };

  const setAge = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, age: event.target.valueAsNumber });
  };

  const setPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: event.target.value });
  };

  const setPasswordForValidation = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, passwordForValidation: event.target.value });
  };

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return {
    form,
    setEmail,
    setAge,
    setPassword,
    setPasswordForValidation,
    handleSignUp,
  };
};

export default useSignUp;
