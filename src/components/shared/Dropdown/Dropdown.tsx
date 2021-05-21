import React from 'react';
import Styled from './Dropdown.styles';

interface DropdownProps {
  defaultOption: string;
  options: string[];
}

const Dropdown = ({ defaultOption, options }: DropdownProps) => {
  return (
    <Styled.Select>
      <option value="" selected disabled>
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
