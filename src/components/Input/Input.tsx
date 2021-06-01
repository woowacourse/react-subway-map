import React, { forwardRef, InputHTMLAttributes } from 'react';
import * as Styled from './Input.styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  labelText?: string;
  errorMessage?: string | null;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ icon, labelText = '', errorMessage, ...props }: Props, ref?) => {
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
