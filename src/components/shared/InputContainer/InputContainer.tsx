import { ReactNode } from 'react';

import { Container, BorderBox, Label, StatusText } from './InputContainer.style';

interface InputContainerProps {
  labelText?: string;
  validation?: {
    text: string;
    isValid: boolean;
  };
  children: ReactNode;
}

const getValidationColor = (isValid: boolean) => (isValid ? '#0dd273' : 'red');

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
