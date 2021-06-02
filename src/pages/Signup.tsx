import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import React from 'react';
import mailImg from 'assets/images/mail.png';
import lockImg from 'assets/images/lock.png';
import personImg from 'assets/images/person.png';
import Title from '@shared/Title/Title';
import { useDispatch } from 'react-redux';
import { signupAsync } from 'redux/authSlice';
import { useHistory } from 'react-router';
import PATH from 'constants/PATH';
import ProfileSelector from '@units/ProfileSelector/ProfileSelector';
import MESSAGE from 'constants/message';
import useChangeEvent from 'hooks/useChangeEvent';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { value: email, onChange: onEmailChange } = useChangeEvent('');
  const { value: age, onChange: onAgeChange } = useChangeEvent('');
  const { value: password, onChange: onPasswordChange } = useChangeEvent('');
  const { value: passwordConfirmation, onChange: onPasswordConfirmationChange } = useChangeEvent('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      alert(MESSAGE.SIGNUP.INVALID_PASSWORD);

      return;
    }

    try {
      await dispatch(signupAsync({ email, password, age }));
      alert(MESSAGE.SIGNUP.SUCCESS);

      history.push(PATH.LOGIN);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Title className="mb-10 mt-6" text="회원가입" />
      <form onSubmit={handleSubmit}>
        <Input
          className="mb-4"
          imgUrl={mailImg}
          placeholder="이메일을 입력해주세요"
          type="email"
          value={email}
          onChange={onEmailChange}
        />
        <Input
          className="mb-4"
          imgUrl={personImg}
          placeholder="나이를 입력해주세요"
          type="number"
          value={age}
          onChange={onAgeChange}
        />
        <Input
          className="mb-4"
          imgUrl={lockImg}
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
        <Input
          className="mb-8"
          imgUrl={lockImg}
          placeholder="비밀번호를 한번 더 입력해주세요"
          type="password"
          value={passwordConfirmation}
          onChange={onPasswordConfirmationChange}
        />
        <ProfileSelector />
        <Button className="mb-4 p-2" size="w-full" text="회원가입" type="submit" />
      </form>
    </Container>
  );
};

export default Signup;
