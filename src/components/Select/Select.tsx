import React, { SelectHTMLAttributes } from 'react';
import * as Styled from './Select.styles';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/caret-down-solid.svg';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  labelText?: string;
  placeholder?: string;
  children: React.ReactElement<HTMLOptionElement> | React.ReactElement<HTMLOptionElement>[];
}

const Select = ({ labelText, placeholder, children, ...props }: Props) => {
  return (
    <Styled.Label>
      {labelText && <Styled.LabelText>{labelText}</Styled.LabelText>}
      <Styled.Select {...props}>
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {children}
      </Styled.Select>
      <Styled.Arrow>
        <ArrowDownIcon />
      </Styled.Arrow>
    </Styled.Label>
  );
};

export default Select;
