import { Container } from './Input.styles';

export interface InputProps {
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number;
  type?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
}
const Input = ({ type = 'text', placeholder, onChange, value, ...props }: InputProps) => (
  <Container type={type} placeholder={placeholder} onChange={onChange} value={value} {...props} />
);

export default Input;
