import { Container } from './Select.styles';

export interface SelectProps {
  options: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
}

const Select = ({ options, onChange, value, ...props }: SelectProps) => (
  <Container onChange={onChange} value={value} {...props}>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </Container>
);

export default Select;
