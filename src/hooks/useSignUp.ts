import { REGEX } from './../constants/validate';
import { requestSignUp } from './../service/auth';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SignUpForm } from '../types';

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

  const isValidForm = () => {
    const { email, age, password, passwordForValidation } = form;

    return (
      REGEX.EMAIL.test(email) && age > 0 && password === passwordForValidation
    );
  };
  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidForm()) {
      return;
    }

    try {
      await requestSignUp(form);
    } catch (error) {
      alert(error.message);
      return;
    }

    alert('회원가입에 성공하셨습니다!');
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
