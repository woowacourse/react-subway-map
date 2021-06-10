import {
  Dispatch,
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { MdEmail } from 'react-icons/md';

import { Icon, Input, InputContainer } from '../../components/shared';

import { ERROR_MESSAGE } from '../../constants/messages';

import { SnackBarContext } from '../../contexts/SnackBarProvider';
import apiRequest from '../../request';
import { emailMessage, isEmailFormatValid } from '../../utils/validations/signupValidation';

interface EmailInputProps {
  isEmailDuplicated: boolean;
  setIsEmailDuplicated: Dispatch<SetStateAction<boolean>>;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ isEmailDuplicated, setIsEmailDuplicated }, ref: ForwardedRef<HTMLInputElement>) => {
    const addMessage = useContext(SnackBarContext)?.addMessage;
    const [isEmailInputCompleted, setIsEmailInputCompleted] = useState(false);
    const emailRef = ref as MutableRefObject<HTMLInputElement>;

    const checkEmailDuplicated = async (value: string) => {
      try {
        const response = await apiRequest.checkEmailDuplicated(value);

        setIsEmailDuplicated(response);
      } catch (error) {
        console.error(error);

        addMessage?.(ERROR_MESSAGE.DEFAULT);
      }
    };

    const onEmailBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      checkEmailDuplicated(event.target.value);
      setIsEmailInputCompleted(true);
    };

    return (
      <InputContainer
        validation={{
          text: emailMessage(emailRef?.current?.value ?? '', isEmailDuplicated),
          isValid: isEmailFormatValid(emailRef?.current?.value ?? '') && !isEmailDuplicated,
        }}
      >
        <Icon>
          <MdEmail />
        </Icon>
        <Input
          type="email"
          placeholder="이메일을 입력하세요"
          ref={emailRef}
          onBlur={onEmailBlur}
          autoComplete="off"
          aria-label="이메일 입력"
        />
      </InputContainer>
    );
  }
);

export default EmailInput;
