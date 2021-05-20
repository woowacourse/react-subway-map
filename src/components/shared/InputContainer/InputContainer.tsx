import { ReactNode } from 'react';

import { Container, Label } from './InputContainer.style';

interface InputContainerProps {
  labelText?: string;
  children: ReactNode;
}

const InputContainer = ({ labelText, children }: InputContainerProps) => (
  <Container>
    {labelText && <Label>{labelText}</Label>}
    {children}
  </Container>
);

export default InputContainer;
export type { InputContainerProps };
