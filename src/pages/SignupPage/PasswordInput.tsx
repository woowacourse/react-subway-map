import { ChangeEventHandler, KeyboardEventHandler } from 'react';
import { MdLock } from 'react-icons/md';
import { Icon, Input, InputContainer } from '../../components/shared';
import { isPasswordValid, passwordErrorMessage } from '../../utils/validations/signupValidation';

interface PasswordInputProps {
  password: string;
  onPasswordChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordKeydown: KeyboardEventHandler<HTMLInputElement>;
}

const PasswordInput = ({ password, onPasswordChange, onPasswordKeydown }: PasswordInputProps) => {
  return (
    <InputContainer
      validation={{ text: passwordErrorMessage(password), isValid: isPasswordValid(password) }}
    >
      <Icon>
        <MdLock />
      </Icon>
      <Input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={onPasswordChange}
        onKeyDown={onPasswordKeydown}
        autoComplete="off"
        aria-label="비밀번호 입력"
      />
    </InputContainer>
  );
};

export default PasswordInput;
