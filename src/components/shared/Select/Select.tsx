import { ReactNode, SelectHTMLAttributes } from 'react';
import { Container, SelectBody } from './Select.style';

const Select = ({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <Container>
    <SelectBody {...props}>{children}</SelectBody>
  </Container>
);

export default Select;
