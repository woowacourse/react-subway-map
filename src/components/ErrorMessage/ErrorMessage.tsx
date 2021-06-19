import { ErrorMessageBlock } from "./ErrorMessage.style";

export interface Props {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: Props) => (
  <ErrorMessageBlock>{children}</ErrorMessageBlock>
);

export default ErrorMessage;
