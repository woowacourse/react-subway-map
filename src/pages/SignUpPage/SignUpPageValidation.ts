import REGEX from '../../constants/regex';
import { SignUp } from '../../types';

export const isValidEmail = (email: SignUp['email']) => REGEX.isEmail.test(email);

export const isValidAge = (age: SignUp['age']) => age <= 150 && age > 0;

export const isValidPassword = (password: SignUp['password']) => password.length >= 8;

export const isValidPasswordConfirm = (
  password: SignUp['password'],
  passwordConfirm: SignUp['passwordConfirm']
) => password === passwordConfirm;
