import { SelectHTMLAttributes } from 'react';
import { StyledSelect } from './Select.styles';

export interface IOption {
  value: number | string;
  name: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: IOption[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  defaultName?: string;
}

const Select = ({ defaultName, options, onChange, ...props }: SelectProps) => {
  return (
    <StyledSelect onChange={onChange} {...props}>
      {defaultName && <option hidden>{defaultName}</option>}

      {options.map(({ value, name }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
