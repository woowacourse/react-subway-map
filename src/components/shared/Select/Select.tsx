import { ReactNode, SelectHTMLAttributes } from 'react';
import { Container, SelectBody } from './Select.style';

const Select = ({ children, value, onChange }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <Container>
    <SelectBody value={value} onChange={onChange}>
      {children}
    </SelectBody>
  </Container>
);

export default Select;
