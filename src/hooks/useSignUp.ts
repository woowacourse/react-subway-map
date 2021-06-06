import { REGEX } from './../constants/validate';
import { requestSignUp } from './../service/auth';
import { useState } from 'react';
import { SignUpForm } from '../types';
import useLogin from './useLogin';
import { SERVICE } from '../constants/service';

const useSignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    email: '',
    age: 0,
    password: '',
    passwordForValidation: '',
  });

  const login = useLogin();

  const isValidEmail = REGEX.EMAIL.test(form.email);
  const isValidAge = form.age > SERVICE.MIN_AGE;
  const isValidPassword = form.password.length >= SERVICE.MIN_PASSWORD_LENGTH;
  const isValidPasswordForValidation =
    form.password === form.passwordForValidation;
  const isFormValid =
    isValidEmail &&
    isValidAge &&
    isValidPassword &&
    isValidPasswordForValidation;

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

  const signUp = async () => {
    if (!isFormValid) return;

    const { email, password } = form;

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
    form,
    setEmail,
    setAge,
    setPassword,
    setPasswordForValidation,
    signUp,
    isFormValid,
    isValidEmail,
    isValidAge,
    isValidPassword,
    isValidPasswordForValidation,
  };
};

export default useSignUp;
