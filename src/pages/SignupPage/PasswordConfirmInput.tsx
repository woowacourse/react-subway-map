import { ChangeEventHandler, KeyboardEventHandler } from 'react';
import { MdLock } from 'react-icons/md';

import { Icon, Input, InputContainer } from '../../components/shared';

import {
  isPasswordMatched,
  passwordMatchedErrorMessage,
} from '../../utils/validations/signupValidation';

interface PasswordConfirmInputProps {
  password: string;
  passwordConfirm: string;
  onPasswordConfirmChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordKeydown: KeyboardEventHandler<HTMLInputElement>;
}

const PasswordConfirmInput = ({
  password,
  passwordConfirm,
  onPasswordConfirmChange,
  onPasswordKeydown,
}: PasswordConfirmInputProps) => {
  return (
    <InputContainer
      validation={{
        text: passwordMatchedErrorMessage(password, passwordConfirm),
        isValid: isPasswordMatched(password, passwordConfirm),
      }}
    >
      <Icon>
        <MdLock />
      </Icon>
      <Input
        type="password"
        placeholder="비밀번호를 한번 더 입력하세요"
        value={passwordConfirm}
        onChange={onPasswordConfirmChange}
        onKeyDown={onPasswordKeydown}
        autoComplete="off"
        aria-label="비밀번호 확인 입력"
      />
    </InputContainer>
  );
};

export default PasswordConfirmInput;
