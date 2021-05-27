import React from 'react';
import Styled from './Dropdown.styles';

interface Option {
  id: number;
  value: string;
}

interface DropdownProps {
  labelText: string;
  defaultOption: string;
  options: Option[];
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ labelText, defaultOption, options, onSelect }: DropdownProps) => {
  return (
    <Styled.Label>
      {labelText}
      <Styled.Select onChange={onSelect} required>
        <option value="" selected disabled hidden>
          {defaultOption}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id} selected={option.value === defaultOption}>
            {option.value}
          </option>
        ))}
      </Styled.Select>
    </Styled.Label>
  );
};

export default Dropdown;
