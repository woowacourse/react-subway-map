import { VFC } from 'react';
import { StyledAlertText } from './AlertText.styles';

export interface AlertTextProps {
  isValid: boolean;
  validText?: string;
  invalidText?: string;
}

const AlertText: VFC<AlertTextProps> = ({
  isValid,
  validText,
  invalidText,
}) => {
  return (
    <StyledAlertText isValid={isValid}>
      {isValid ? validText : invalidText}
    </StyledAlertText>
  );
};

export default AlertText;
