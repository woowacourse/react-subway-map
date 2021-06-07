import React, { SelectHTMLAttributes } from 'react';
import * as Styled from './Select.styles';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/caret-down-solid.svg';

type ArrowDirection = 'up' | 'down';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  labelText?: string;
  placeholder?: string;
  arrowDirection?: ArrowDirection;
  children: React.ReactElement<HTMLOptionElement> | React.ReactElement<HTMLOptionElement>[];
}

const Select = ({
  labelText,
  placeholder,
  arrowDirection = 'down',
  children,
  ...props
}: IProps) => {
  return (
    <Styled.Label>
      {labelText && <Styled.LabelText>{labelText}</Styled.LabelText>}
      <Styled.Select {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </Styled.Select>
      <Styled.Arrow arrowDirection={arrowDirection}>
        <ArrowDownIcon />
      </Styled.Arrow>
    </Styled.Label>
  );
};

export default Select;
