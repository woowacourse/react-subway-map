import { VFC } from 'react';
import { StyledAlertText } from './ValidationText.styles';

export interface ValidationTextProps {
  isValid: boolean;
  validText?: string;
  invalidText?: string;
}

const ValidationText: VFC<ValidationTextProps> = ({
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

export default ValidationText;
