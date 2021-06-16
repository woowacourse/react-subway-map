import { InputHTMLAttributes, VFC } from 'react';
import ValidationText, {
  ValidationTextProps,
} from './ValidationText/ValidationText';
import Input from '../../@common/Input/Input';
import { InputContainer } from './ValidationInput.styles';

interface ValidationInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    ValidationTextProps {}

const ValidationInput: VFC<ValidationInputProps> = ({
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
        <ValidationText
          isValid={isValid}
          invalidText={invalidText}
          validText={validText}
        />
      )}
    </InputContainer>
  );
};

export default ValidationInput;
