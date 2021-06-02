import { Container } from './Main.styles';

export interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return <Container>{children}</Container>;
};

export default Main;
