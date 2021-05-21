import { Container } from './Input.styles';

export interface InputProps {
  type: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
}
const Input = ({ type, placeholder, onChange, value, ...props }: InputProps) => (
  <Container type={type} placeholder={placeholder} onChange={onChange} value={value} {...props} />
);

export default Input;
