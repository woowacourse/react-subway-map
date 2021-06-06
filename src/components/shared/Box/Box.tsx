import { ReactNode } from 'react';

import { Container, ContainerProps } from './Box.style';

interface BoxProps extends ContainerProps {
  children: ReactNode;
}

const Box = ({ hatColor, backgroundColor, children }: BoxProps) => (
  <Container hatColor={hatColor} backgroundColor={backgroundColor}>
    {children}
  </Container>
);

export default Box;
export type { BoxProps };
