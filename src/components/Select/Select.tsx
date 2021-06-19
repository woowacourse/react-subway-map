import { SelectHTMLAttributes } from "react";

import { SelectBlock, SelectBlockProps } from "./Select.styles";

interface Option {
  value: string | number;
  text: string;
}

export interface Props
  extends SelectHTMLAttributes<HTMLSelectElement>,
    SelectBlockProps {
  defaultOption?: string;
  options: Option[];
}

const Select = ({ defaultOption, value, options, ...props }: Props) => (
  <SelectBlock value={value || -1} {...props}>
    {defaultOption && (
      <option value={-1} disabled hidden>
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
