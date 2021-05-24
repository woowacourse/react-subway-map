import APIClient from '../API/API';
import { SignUpForm } from '../types';

export const requestSignUp = async (
  form: Omit<SignUpForm, 'passwordForValidation'>
) => {
  const response = await APIClient.post('/members', form);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }
};
