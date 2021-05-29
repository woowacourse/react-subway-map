import { Container } from './RootContainer.styles';

export interface RootContainerProps {
  children: React.ReactNode;
}
const RootContainer = ({ children }: RootContainerProps) => {
  return <Container>{children}</Container>;
};

export default RootContainer;
