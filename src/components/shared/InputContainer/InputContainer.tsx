import { ReactNode } from 'react';

import { Container, BorderBox, Label, StatusText } from './InputContainer.style';
import PALETTE from '../../../constants/palette';
import { Validation } from '../../../types';

interface InputContainerProps {
  labelText?: string;
  validation?: Validation;
  children: ReactNode;
}

const getValidationColor = (isValid: boolean) => (isValid ? PALETTE.NAVER : PALETTE.RED);

const InputContainer = ({ labelText, validation, children }: InputContainerProps) => (
  <Container>
    <BorderBox>
      {labelText && <Label>{labelText}</Label>}
      {children}
    </BorderBox>
    {validation && (
      <StatusText style={{ color: getValidationColor(validation.isValid) }}>
        {validation.text}
      </StatusText>
    )}
  </Container>
);

export default InputContainer;
export type { InputContainerProps };
