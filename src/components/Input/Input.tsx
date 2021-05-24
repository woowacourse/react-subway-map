import React, { forwardRef, InputHTMLAttributes } from 'react';
import * as Styled from './Input.styles';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  labelText?: string;
  errorMessage?: string | null;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ icon, labelText = '', errorMessage, ...props }: IProps, ref?) => {
    return (
      <Styled.Label>
        <Styled.LabelText>{labelText}</Styled.LabelText>
        {icon && <Styled.Icon>{icon}</Styled.Icon>}
        <Styled.Input isError={!!errorMessage} ref={ref} hasIcon={!!icon} {...props} />
        {errorMessage && <Styled.Message>{errorMessage}</Styled.Message>}
      </Styled.Label>
    );
  }
);

export default Input;
