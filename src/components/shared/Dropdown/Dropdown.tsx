import React from 'react';
import Styled from './Dropdown.styles';

interface DropdownProps {
  defaultOption: string;
  options: string[];
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ defaultOption, options, onSelect }: DropdownProps) => {
  return (
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
  );
};

export default Dropdown;
