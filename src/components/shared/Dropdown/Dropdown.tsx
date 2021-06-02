import React from 'react';
import Styled from './Dropdown.styles';

interface Option {
  id: number;
  value: string;
}

interface Props {
  labelText?: string;
  defaultValue?: string;
  options: Option[];
  value: string | number;
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ labelText, defaultValue, options, value, onSelect }: Props) => {
  return (
    <Styled.Label>
      {labelText}
      <Styled.Select value={value} onChange={onSelect} required>
        {defaultValue && (
          <option value="" selected disabled hidden>
            {defaultValue}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id} selected={option.value === value}>
            {option.value}
          </option>
        ))}
      </Styled.Select>
    </Styled.Label>
  );
};

export default Dropdown;
