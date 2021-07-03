import { useState, HTMLAttributes, useEffect } from 'react';
import { Container, Inner } from './Header.styles';

interface HeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'translate'>,
    React.CSSProperties {}

const Header = ({ children, backgroundColor, color = 'white' }: HeaderProps) => {
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
    <Container backgroundColor={backgroundColor} color={color} isAppear={isAppear}>
      <Inner>{children}</Inner>
    </Container>
  );
};

export default Header;
export type { HeaderProps };
