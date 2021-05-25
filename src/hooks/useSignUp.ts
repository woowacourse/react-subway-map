import { REGEX } from './../constants/validate';
import { requestSignUp } from './../service/auth';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SignUpForm } from '../types';
import useLogin from './useLogin';

const useSignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    email: '',
    age: 0,
    password: '',
    passwordForValidation: '',
  });

  const { email, age, password, passwordForValidation } = form;
  const login = useLogin();

  const setEmail = (email: string) => {
    setForm({ ...form, email });
  };

  const setAge = (age: number) => {
    setForm({ ...form, age });
  };

  const setPassword = (password: string) => {
    setForm({ ...form, password });
  };

  const setPasswordForValidation = (passwordForValidation: string) => {
    setForm({ ...form, passwordForValidation });
  };

  const isValidForm = () => {
    const { email, age, password, passwordForValidation } = form;

    return (
      REGEX.EMAIL.test(email) && age > 0 && password === passwordForValidation
    );
  };

  const signUp = async () => {
    if (!isValidForm()) return;

    try {
      await requestSignUp(form);
    } catch (error) {
      alert(error.message);
      return;
    }

    alert('회원가입에 성공하셨습니다!');
    login.login({ email, password });
  };

  return {
    email,
    age,
    password,
    passwordForValidation,
    setEmail,
    setAge,
    setPassword,
    setPasswordForValidation,
    signUp,
  };
};

export default useSignUp;
