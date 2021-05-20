import { useState, HTMLAttributes, useEffect } from 'react';
import { Properties } from 'csstype';

import { Container, Inner } from './Header.styles';

interface HeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'translate'>,
    Properties {}

const Header = ({ children, backgroundColor }: HeaderProps) => {
  const [isAppear, setIsAppear] = useState(true);

  useEffect(() => {
    const onScroll = ({ deltaY }: WheelEvent) => {
      if (deltaY < 0) {
        setIsAppear(true);
      } else {
        setIsAppear(false);
      }
    };

    document.addEventListener('wheel', onScroll);

    return () => {
      document.removeEventListener('wheel', onScroll);
    };
  }, []);

  return (
    <Container backgroundColor={backgroundColor} isAppear={isAppear}>
      <Inner>{children}</Inner>
    </Container>
  );
};

export default Header;
export type { HeaderProps };
