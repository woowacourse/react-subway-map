import { ReactNode } from 'react';
import { Container, ContainerProps } from './Box.style';

interface BoxProps extends ContainerProps {
  children: ReactNode;
}

const Box = ({ hatColor, children }: BoxProps) => (
  <Container hatColor={hatColor}>{children}</Container>
);

export default Box;
export type { BoxProps };
