import { SelectHTMLAttributes } from "react";

import { SelectBlock, SelectStylesProps } from "./Select.styles";

interface Option {
  value: number;
  text: string;
}

export interface Props extends SelectHTMLAttributes<HTMLSelectElement>, SelectStylesProps {
  defaultOption?: string;
  options: Option[];
}

const Select = ({ defaultOption, options, ...props }: Props) => (
  <SelectBlock {...props}>
    {defaultOption && (
      <option value="" selected disabled hidden>
        {defaultOption}
      </option>
    )}
    {options.map(({ value, text }) => (
      <option key={value} value={value}>
        {text}
      </option>
    ))}
  </SelectBlock>
);

export default Select;
