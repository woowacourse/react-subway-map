import { Container } from './Input.styles';

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  value: string | number;
  ariaLabel?: string;
}
const Input = ({
  type = 'text',
  placeholder,
  onChange,
  value,
  ariaLabel,
  ...props
}: InputProps) => (
  <Container
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    aria-label={ariaLabel}
    {...props}
  />
);

export default Input;
