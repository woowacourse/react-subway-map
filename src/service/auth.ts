import APIClient from '../API/API';
import { LoginForm, SignUpForm } from '../types';

export const requestSignUp = async (
  form: Omit<SignUpForm, 'passwordForValidation'>
) => {
  const response = await APIClient.post('/members', form);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }
};

export const requestLogin = async (form: LoginForm) => {
  const response = await APIClient.post('/login/token', form);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }

  return response.json();
};
