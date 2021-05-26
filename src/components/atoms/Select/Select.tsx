import { Container } from './Select.styles';

export interface IOption {
  value: number | string;
  name: string;
}
export interface SelectProps {
  options: IOption[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  selectValue: string | number;
  defaultName?: string;
}

const Select = ({ defaultName, options, onChange, selectValue, ...props }: SelectProps) => (
  <Container onChange={onChange} value={selectValue} {...props}>
    {defaultName && (
      <option selected hidden>
        {defaultName}
      </option>
    )}

    {options.map(({ value, name }) => (
      <option key={value} value={value}>
        {name}
      </option>
    ))}
  </Container>
);

export default Select;
