import { ChangeEventHandler } from 'react';
import { MdPerson } from 'react-icons/md';
import { Icon, Input, InputContainer } from '../../components/shared';
import { SIGNUP_VALUE } from '../../constants/values';
import { ageErrorMessage, isAgeValid } from '../../utils/validations/signupValidation';

interface AgeInputProps {
  age: string;
  onAgeChange: ChangeEventHandler<HTMLInputElement>;
}

const AgeInput = ({ age, onAgeChange }: AgeInputProps) => {
  return (
    <InputContainer validation={{ text: ageErrorMessage(age), isValid: isAgeValid(age) }}>
      <Icon>
        <MdPerson />
      </Icon>
      <Input
        type="text"
        placeholder="나이를 입력하세요"
        maxLength={SIGNUP_VALUE.AGE_MAX_LENGTH}
        value={age}
        onChange={onAgeChange}
        autoComplete="off"
        aria-label="나이 입력"
      />
    </InputContainer>
  );
};

export default AgeInput;
