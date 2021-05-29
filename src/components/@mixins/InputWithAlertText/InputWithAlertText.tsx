import { InputHTMLAttributes, VFC } from 'react';
import AlertText, { AlertTextProps } from '../../@common/AlertText/AlertText';
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
  ...inputArgs
}) => {
  return (
    <InputContainer>
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
