import { Container, Message } from './ErrorMessage.styles';

interface ErrorMessageProps {
  text: string;
}

const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return (
    <Container>
      <Message>{text}</Message>
    </Container>
  );
};

export default ErrorMessage;
