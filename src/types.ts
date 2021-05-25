export type FlexDirection = 'horizontal' | 'vertical';

export type ModalSize = 'small' | 'medium' | 'large';

export interface SignUpForm {
  email: string;
  age: number;
  password: string;
  passwordForValidation: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
