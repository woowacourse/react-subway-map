import React from 'react';
import Styled from './Dropdown.styles';

interface DropdownProps {
  labelText: string;
  defaultOption: string;
  options: string[];
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
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Styled.Select>
    </Styled.Label>
  );
};

export default Dropdown;
