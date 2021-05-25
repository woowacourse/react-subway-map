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
      <Styled.Select defaultValue={defaultOption} onChange={onSelect}>
        <option value={defaultOption} disabled>
          {defaultOption}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </Styled.Select>
    </Styled.Label>
  );
};

export default Dropdown;
