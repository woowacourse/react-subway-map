import { SelectHTMLAttributes } from "react";

import { SelectBlock, SelectStylesProps } from "./Select.styles";

interface Option {
  value: number;
  text: string;
}

export interface Props extends SelectHTMLAttributes<HTMLSelectElement>, SelectStylesProps {
  options: Option[];
}

const Select = ({ options, ...props }: Props) => (
  <SelectBlock {...props}>
    {options.map(({ value, text }) => (
      <option value={value}>{text}</option>
    ))}
  </SelectBlock>
);

export default Select;
