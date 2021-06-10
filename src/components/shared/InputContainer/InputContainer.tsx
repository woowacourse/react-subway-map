import { ReactNode } from 'react';

import { Container, BorderBox, Label, StatusText } from './InputContainer.style';
import PALETTE from '../../../constants/palette';

interface InputContainerProps {
  labelText?: string;
  validation?: {
    text: string;
    isValid: boolean;
  };
  children: ReactNode;
}

const getValidationColor = (isValid: boolean) =>
  isValid ? PALETTE.YELLOW_GREEN_100 : PALETTE.RED_100;

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
