import { Container } from './Title.styles';

export interface TitleProps {
  children: React.ReactNode;
}
const Title = ({ children }: TitleProps) => {
  return <Container>{children}</Container>;
};

export default Title;
