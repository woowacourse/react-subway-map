import { InputHTMLAttributes, VFC } from 'react';
import AlertText, { AlertTextProps } from './AlertText/AlertText';
import Input from '../../@common/Input/Input';
import { InputContainer } from './InputWithAlertText.styles';

interface InputWithAlertTextProps
  extends InputHTMLAttributes<HTMLInputElement>,
    AlertTextProps {}

const InputWithAlertText: VFC<InputWithAlertTextProps> = ({
  isValid,
  invalidText,
  validText,
  value,
  className,
  ...inputArgs
}) => {
  return (
    <InputContainer className={className}>
      <Input value={value} {...inputArgs} />
      {!!value && (
        <AlertText
          isValid={isValid}
          invalidText={invalidText}
          validText={validText}
        />
      )}
    </InputContainer>
  );
};

export default InputWithAlertText;
